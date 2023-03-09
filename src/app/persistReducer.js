import storage from 'redux-persist/lib/storage';
import { persistReducer, createTransform } from 'redux-persist'
import { rootReducer } from './index'
import CryptoJS from 'crypto-js';


const SECRET_KEY  = process.env.REACT_APP_PERSIST_SECRET_KEY
// only encrypt login user data
const encrypt = createTransform(
    (inboundState, key) => {
        if (!inboundState) return inboundState;
        const cryptedText = CryptoJS.AES.encrypt(JSON.stringify(inboundState), SECRET_KEY);
        return cryptedText.toString();
    },
    (outboundState, key) => {
        if (!outboundState) return outboundState;
        const bytes = CryptoJS.AES.decrypt(outboundState, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8); 
        return JSON.parse(decrypted);
    },
    { whitelist: ['auth'] }
);

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth'],
    bootstrapped: false, registry: ["root"],
    transforms: [encrypt],
};
export const persistedReducer = persistReducer(persistConfig, rootReducer);
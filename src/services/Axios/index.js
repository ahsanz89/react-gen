import axios from 'axios';
import { BACKEND_CONFIG as CONFIG} from '../../data/config';
import CryptoJS from 'crypto-js';
import { setAuthToken } from '../../app/features/auth/authSlice';

let store
let SECRET_KEY = process.env.REACT_APP_PERSIST_SECRET_KEY
export const injectStore = _store => {
  store = _store
}

export const getPersistUser = (key) => {
  if (localStorage.getItem('persist:auth') !== undefined) {
    let localStorageObj = JSON.parse(localStorage.getItem('persist:auth'));
    if (localStorageObj !== null) {
      localStorageObj = JSON.parse(localStorageObj.auth)
      const bytes = CryptoJS.AES.decrypt(localStorageObj, SECRET_KEY);
      let decrypted = bytes.toString(CryptoJS.enc.Utf8);
      decrypted = JSON.parse(decrypted);
      return decrypted;
    }
  }
}

export const getPersistUserData = (key) => {
  if (key === null || key === '') {
    return getPersistUser()
  } else {
    const value = store.getState().auth[key]
    if (value === null || value === '') {
      return getPersistUser()[key]
    }
    return value;
  }
}
export const apiRequest = (method, uri, body, header) => {
  // const url = `${CONFIG.BASE_URL}${uri}`;
  const url = `${uri}`;
  const httpMethod = method.toUpperCase();

  const requestOptions = {
    method: method,
    headers: CONFIG.JSON_HEADER
  };

  if (httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH') {
    requestOptions.body = JSON.stringify(body);
  }
  return fetch(url, requestOptions);
};
axios.interceptors.request.use((config) => {
  document.body.classList.add('loading-indicator');
  const token = getPersistUserData('token');
  var currentLocation = window.location.pathname;
  if (token !== null && token.length !== 0 && config.url.indexOf('refreshToken') === -1) {
    config.headers.Authorization = `Bearer ${token}`;

  }
  else if ((token === null || token === '') && currentLocation !== "/404") {
    store.dispatch(setAuthToken(false)); // logout if token not in store and persist
    // window.location = '/login';
  }
  return config;
}, (error) => {
  document.body.classList.remove('loading-indicator');
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    setTimeout(() => {
      document.body.classList.remove('loading-indicator');
    }, 1000)
    return response
  },
  error => {
    document.body.classList.remove('loading-indicator'); 
    if (error === "Error: Network Error") {
      var currentLocation = window.location.pathname;
      if (currentLocation !== '/login') {
        store.dispatch(setAuthToken(false))
        // window.location = '/login';
      }
      // store.dispatch(setMsg("INTERNAL_SERVER_ERROR"))
    }
    if (error.response) { //Network error
      const originalRequest = error.config;
      // Prevent infinite loops
      if (error.response.status === 401 && originalRequest.url.indexOf('refreshToken') !== -1) {
        store.dispatch(setAuthToken(false))
        return Promise.reject(error);
      }

      // if (error.response.status === 401) {
      //   let userId = getPersistUserData('user')?.user_no
      //   if (userId !== null) {
      //     return apiRequestAxio('POST', 'auth/refreshToken',
      //       {
      //         user_no: userId,
      //       },
      //       { "Content-Type": "application/json" }
      //     )
      //       .then((response) => {
      //         store.dispatch(setRefreshToken({ token: response.data.token }))
      //         axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
      //         originalRequest.headers['Authorization'] = "Bearer " + response.data.token;
      //         return axios(originalRequest)
      //       })
      //       .catch(err => {
      //         // token api failed
      //         userLogout(store)
      //       });
      //   } else {
      //     //User is not in store
      //     userLogout(store)
      //   }
      // }
      // specific error handling done elsewhere
      return Promise.reject(error);
    }
  }
);

export const apiRequestAxio = (method, uri, body, header) => {
  const httpMethod = method.toUpperCase();
  const requestOptions = {
    // url: `${CONFIG.BASE_URL}${uri}`,
    url: `${uri}`,
    method: method.toUpperCase(),
    headers: { ...CONFIG.JSON_HEADER, ...header }
  };

  if (httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH') {
    requestOptions.data = header["content-type"] === "multipart/form-data" ? body : JSON.stringify(body);
  }

  let response = axios(requestOptions);

  response.then(result => {
    if (!result) {
      response = new Promise((resolve, reject) => {
        resolve({ data: [] });
      });
    }
  })
  return response
};


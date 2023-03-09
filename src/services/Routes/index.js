import axios from "axios"
import { GET_ROUTES } from "../../data/endPoints";

export const getRoutes = async() => {
   const res = await axios.get(GET_ROUTES);
   return res.data;
}
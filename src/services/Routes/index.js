import { GET_ROUTES } from "../../data/endPoints";
import { apiRequestAxio } from "../Axios";

export const getRoutes = async() => {
   const res = await apiRequestAxio("GET", GET_ROUTES)
   return res.data;
}
import axios from "axios";
const httpAxios=axios.create({
    baseURL:'http://localhost:8000/api/',
 
 });
 httpAxios.interceptors.response.use(function(response){
    return response.data;
 },function(error)
 {
    return Promise.reject(error);
 });
 export default httpAxios;
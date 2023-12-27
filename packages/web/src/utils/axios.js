 import axios from 'axios';

 const axiosServices = axios.create({
      baseURL: 'http://localhost:3001/api/v1/',
 });

 axiosServices.interceptors.response.use(
     (response) => response,
     (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
 );
 
 export default axiosServices;
 
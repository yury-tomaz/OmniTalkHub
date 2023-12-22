import axios from "axios";
import env from "../../infrastructure/config/env";

const axiosServices = axios.create(
  {
    baseURL: env.keycloak.url,
    timeout: 10000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
);

axiosServices.interceptors.response.use(
 (response) => response,
 (error) => Promise.reject(error.response && error.response.data) || 'Something went wrong'
);

export default axiosServices;
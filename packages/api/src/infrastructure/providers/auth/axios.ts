import axios from "axios";
import env from "../../config/env";

const apiKeycloak = axios.create({
  baseURL: env.keycloak.url,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export { apiKeycloak };
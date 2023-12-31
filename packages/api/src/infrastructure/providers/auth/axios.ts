import axios from "axios";
import env from "../../config/env";

const apiKeycloak = axios.create({
  baseURL: env.keycloak.url,
  headers: {
    'User-Agent': 'omnichat-api/1.0',
  },
});

export { apiKeycloak };
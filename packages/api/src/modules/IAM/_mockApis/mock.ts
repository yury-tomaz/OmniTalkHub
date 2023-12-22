import AxiosMockAdapter from 'axios-mock-adapter';
import keycloakApi from '../axios';

const mock = new AxiosMockAdapter(keycloakApi, { delayResponse: 0 });
export default mock;

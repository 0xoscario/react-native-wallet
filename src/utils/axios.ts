/**
 * @format
 */
import Axios from 'axios';

const axios = Axios.create({
  timeout: 15000,
  withCredentials: true
});

export default axios;

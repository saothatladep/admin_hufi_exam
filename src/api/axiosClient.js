import axios from 'axios';
require('dotenv').config();
const { REACT_APP_URL } = process.env;
const axiosClient = axios.create({
  baseURL: REACT_APP_URL,
});

export default axiosClient;

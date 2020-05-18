import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ti-ruralbrasil.herokuapp.com',
});

export default api;

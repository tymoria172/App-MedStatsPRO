import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: 'https://utisoftsandbox.appws.com.br',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://bling.com.br/Api/v2/',
    headers: {"Acess-Control-Allow-Origin": "*"},
});

export default api;
import axios from 'axios';
// const BASE_URL = process.env.WCRANE_CLI_BASE_URL ? process.env.WCRANE_CLI_BASE_URL : 'https://wcrane-cli.wcrane.cn/api/'
const BASE_URL = 'http://127.0.0.1:7005/api/'


const service = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
})


service.interceptors.request.use((config) => {
    return config
}, err => {
    return Promise.reject(err)
})
service.interceptors.response.use((response) => {
    return response.data
}, err => {
    return Promise.reject(err)
})



export default service;



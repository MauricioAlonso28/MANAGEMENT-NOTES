import axios, { AxiosInstance } from 'axios'
import { URL_API } from './constants/constants'

// Axios global config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => { 
    return Promise.reject(error)
  }
)

export default axiosInstance
import axios from 'axios'
import 'dotenv/config'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      console.error('Response error:', error.response)
      if (error.response.status === 401) {
        alert('Unauthorized. Please log in again.')
      }
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Axios error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance

import storage from '../utils/localStore'
import axios from 'axios'

const axiosClient = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(config => {
  const token = storage.getAccessToken()
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`
  }
  return config
})

// axiosClient.interceptors.response.use(
//   response => {
//     const data = response.data

//     if (response.status === 401) {
//       storage.removeAccessToken()
//       window.location.href = '/login'
//     }

//     if (response.status >= 400) {
//       return Promise.reject(new Error(response.statusText || 'Error'))
//     }

//     return data
//   },
//   error => {
//     if (error.response && error.response.status) {
//       switch (error.response.status) {
//         case 401:
//           storage.removeAccessToken()
//           window.location.href = '/login'
//           break
//       }
//     }
//     return Promise.reject(error)
//   }
// )

export default axiosClient

import axios from 'axios'
import router from '@/router'

// s异常拦截处理器
const errorHandle = (error: any) => {
  return Promise.reject(error)
}

const instance = axios.create({
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  },
  //   baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000
})

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  token && (config.headers.Authorization = 'Bearer ' + token)
  return config
}, errorHandle)

instance.interceptors.response.use(response => {
  if (response.data.errno !== 0) {
    localStorage.removeItem('token')
    router.push('/login')
  }
  return response.data
}, errorHandle)

export default (options: any) => {
  return instance(options)
}

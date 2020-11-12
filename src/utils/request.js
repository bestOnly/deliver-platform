import axios from 'axios'
import qs from 'qs'
import local from '../utils/local'
import { Message } from 'element-ui'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 基准接口路径
axios.defaults.baseURL = 'http://127.0.0.1:5000'
// 请求超时时间
axios.defaults.timeout = 5000

// 请求拦截器（获取token）
axios.interceptors.request.use(config => {
  nprogress.start()
  const token = local.get('token')
  if (token) {
    config.headers.authorization = token
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use(res => {
  const { code, msg } = res.data
  if (code === 0) {
    Message({
      type: 'success',
      message: msg || ''
    })
  } else if (code === 1) {
    Message({
      type: 'error',
      message: msg || ''
    })
  }
  nprogress.done()
  return res
})

// 封装get，post请求
export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  post(url, reqbody) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(reqbody))
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
}

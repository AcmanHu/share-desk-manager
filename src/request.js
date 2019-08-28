import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import { MessageBox } from 'element-ui'
import router from './router'

// axios.defaults.baseURL = 'http://zelfly.com:81'
let axiosInstance = axios.create({
  // config里面有这个transformRquest， 这个选项会在发送参数前进行处理。 这时候我们通过Qs.stringify转换为表单查询参数
  baseURL: 'http://zelfly.com:81',
  transformRequest: [function (data) {
    data = Qs.stringify(data)
    return data
  }],
  // 设置Content - Type
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 添加请求拦截器
axiosInstance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  console.log(error)

  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axiosInstance.interceptors.response.use((response) => {
  // 对响应数据做点什么
  // console.log(response)

  return response
}, (error) => {
  // 对响应错误做点什么
  if (error.response.status === 403) {
    // Message.error("身份已经过期，请返回重新登陆");
    MessageBox('返回重新登陆', '身份过期', {
      confirmButtonText: '确定'
    }).then(res => {
      router.replace({ name: 'login' })
    })
  }
  return Promise.reject(error.response.data)
})

export { axiosInstance, VueAxios }

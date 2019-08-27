import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs';

axios.defaults.baseURL = 'http://zelfly.com:81'
var axios_instance = axios.create({
  // config里面有这个transformRquest， 这个选项会在发送参数前进行处理。 这时候我们通过Qs.stringify转换为表单查询参数
  transformRequest: [function (data) {
    data = Qs.stringify(data);
    return data;
  }],
  // 设置Content - Type
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   return response
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })


export { axios_instance, VueAxios }

import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 15000
})

// 响应拦截
request.interceptors.response.use(
  (res) => {
    if (res.status === 200) return res
    else {
      console.log(res.statusText)
      return Promise.reject(new Error(res.statusText))
    }
  },
  (err) => {
    console.log(err)
    return Promise.reject(err)
  }
)

export default request

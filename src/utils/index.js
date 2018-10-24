import axios from 'axios'
import router from '../router'
import { message } from 'element-ui'
const baseURL = '/admin'

const Instance = axios.create({
  baseURL,
  timeout: 15000
})

class getDate {
  static get (url, data, config) {
    return new Promise((resolve, reject) => {
      Instance.get(url, {params: data}, config).then(res => {
        if (res.data.code === 403) {
          message.warning('登录状态失效，请重新登录')
          setTimeout(() => {
            router.push('/login')
          }, 1000)
        } else {
          resolve(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
  static fetch (url, data, config, methods) {
    return new Promise((resolve, reject) => {
      Instance[methods](url, data, config).then(res => {
        console.log(url)
        if (res.data.code === 403) {
          router.push('/login')
        } else {
          resolve(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
  static post (url, data, config) {
    return this.fetch(url, data, config, 'post')
  }
  static put (url, data, config) {
    return this.fetch(url, data, config, 'put')
  }
}

export { getDate }

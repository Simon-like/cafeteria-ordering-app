import axios from 'axios'

const login = axios.create({
  baseURL: 'https://yapi.adb-tech.com/mock/1288',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

export { login }

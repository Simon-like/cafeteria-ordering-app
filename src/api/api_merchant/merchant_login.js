import { login } from '/src/utils/request/request.js'

function login_pp(phoneNumber, password) {
  return login.post('/merchant/login/password', { phoneNumber, password })
}

function login_pv(phoneNumber, validationCode) {
  return login.post('/merchant/login/phone', { phoneNumber, validationCode })
}
export { login_pp, login_pv }

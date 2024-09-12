import { http } from '@/utils/http'

export const admin_Login_pp = (phoneNumber, password) => {
  return http({
    method: 'POST',
    url: '/administer/login/password',
    data: {
      phoneNumber,
      password,
    },
  })
}

export const admin_Login_pv = (phoneNumber, validationCode) => {
  return http({
    method: 'POST',
    url: '/administer/login/phone',
    data: {
      phoneNumber,
      validationCode,
    },
  })
}

export const admin_getvalidationCode = (phoneNumber) => {
  return http({
    method: 'GET',
    url: `/administer/phone?phoneNumber=${phoneNumber}`,
  })
}

export const admin_register = (phoneNumber, realName, inviteCode, password, college) => {
  return http({
    method: 'POST',
    url: '/administer/register',
    data: {
      phoneNumber,
      realName,
      inviteCode,
      password,
      college,
    },
  })
}

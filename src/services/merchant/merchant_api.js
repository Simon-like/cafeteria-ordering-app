import { http } from '@/utils/http'

export const merchant_Login_pp = (phoneNumber, password) => {
  return http({
    method: 'POST',
    url: '/merchant/login/password',
    data: {
      phoneNumber,
      password,
    },
  })
}

export const merchant_Login_pv = (phoneNumber, validationCode) => {
  return http({
    method: 'POST',
    url: '/merchant/login/phone',
    data: {
      phoneNumber,
      validationCode,
    },
  })
}

export const merchant_getvalidationCode = (phoneNumber) => {
  return http({
    method: 'GET',
    url: `/merchant/phone?phoneNumber=${phoneNumber}`,
  })
}

export const merchant_register = (phoneNumber, realName, name, address, password, college) => {
  return http({
    method: 'POST',
    url: '/merchant/register',
    data: {
      phoneNumber,
      realName,
      name,
      address,
      password,
      college,
    },
  })
}

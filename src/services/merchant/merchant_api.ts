import { http } from '@/utils/http'
import type { resMsg } from '@/types/aside'
export const merchant_Login_pp = (phoneNumber: string, password: string) => {
  return http<resMsg>({
    method: 'POST',
    url: '/merchant/login/password',
    data: {
      phoneNumber,
      password,
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

export const merchant_Login_pv = (phoneNumber: string, validationCode: string) => {
  return http<resMsg>({
    method: 'POST',
    url: '/merchant/login/phone',
    data: {
      phoneNumber,
      validationCode,
    },
  })
}

export const merchant_getvalidationCode = (phoneNumber: string) => {
  return http({
    method: 'GET',
    url: `/merchant/phone?phoneNumber=${phoneNumber}`,
  })
}

export const merchant_register = (
  phoneNumber: string,
  realName: string,
  name: string,
  address: string,
  password: string,
  college: string,
) => {
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

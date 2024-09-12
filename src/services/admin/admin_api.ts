import { http } from '@/utils/http'
import type { resMsg } from '@/types/aside'
export const admin_Login_pp = (phoneNumber: string, password: string) => {
  return http<resMsg>({
    method: 'POST',
    url: '/administer/login/password',
    data: {
      phoneNumber,
      password,
    },
  })
}

export const admin_Login_pv = (phoneNumber: string, validationCode: string) => {
  return http<resMsg>({
    method: 'POST',
    url: '/administer/login/phone',
    data: {
      phoneNumber,
      validationCode,
    },
  })
}

export const admin_getvalidationCode = (phoneNumber: string) => {
  return http({
    method: 'GET',
    url: `/administer/phone?phoneNumber=${phoneNumber}`,
  })
}

export const admin_register = (
  phoneNumber: string,
  realName: string,
  inviteCode: string,
  password: string,
  college: string,
) => {
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

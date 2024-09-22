import { http } from '@/utils/http'
import type { TokenType } from '@/types/login_register'
export const admin_Login_pp = (phoneNumber: string, password: string) => {
  return http<TokenType>({
    method: 'POST',
    url: '/administer/login/password',
    data: {
      phoneNumber,
      password,
    },
  })
}

export const admin_Login_pv = (phoneNumber: string, validationCode: string) => {
  return http<TokenType>({
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
    url: `/administer/getCaptcha?phoneNumber=${phoneNumber}`,
  })
}

export const admin_register = (
  phoneNumber: string,
  password: string,
  inviteCode: string,
  realName: string,
  college: string,
  validationCode: string,
) => {
  return http({
    method: 'POST',
    url: '/administer/register',
    data: {
      phoneNumber,
      password,
      realName,
      inviteCode,
      college,
      validationCode,
    },
  })
}

export const admin_forget = (newPassword: string, phoneNumber: string) => {
  return http({
    method: 'POST',
    url: '/administer/findPassword',
    data: {
      newPassword,
      phoneNumber,
    },
  })
}

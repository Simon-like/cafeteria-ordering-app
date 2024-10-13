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
export const admin_checkCode = (phoneNumber: string, validationCode: string) => {
  return http({
    method: 'POST',
    url: '/administer/ValidCaptcha',
    data: {
      phoneNumber,
      validationCode,
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }, //以后请注意请求头信息
  })
}

// 获取所有公告
export const getNotice = () => {
  return http({
    method: 'GET',
    url: '/administer/notice/getNotice',
  })
}

// 管理端发布公告
export const addNotice = (content: string, targetGroup: number) => {
  return http<
    {
      id: number
      targetGroup: number
      content: string
      releaseTime: string
    }[]
  >({
    method: 'POST',
    url: '/administer/notice/addNotice',
    data: {
      content,
      targetGroup, // 0外卖员，1商家
    },
  })
}

import { http } from '@/utils/http'
import type { TokenType } from '@/types/login_register'
import type { AdressItem, ColleagueItem } from '@/types/admin_return'
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
  return http<
    {
      id: number
      targetGroup: number
      content: string
      releaseTime: string
    }[]
  >({
    method: 'GET',
    url: '/administer/notice/getNotice',
  })
}

// 管理端发布公告
export const addNotice = (content: string, targetGroup: number) => {
  return http({
    method: 'POST',
    url: '/administer/notice/addNotice',
    data: {
      content,
      targetGroup, // 0外卖员，1商家
    },
  })
}

// 管理端通过ID删除公告
export const deleteNoticeById = (noticeId: number) => {
  return http({
    method: 'DELETE',
    url: `/administer/notice/deleteNoticeById?noticeId=${noticeId}`,
  })
}

/**
 * 系统设置
 */

// 新增地址信息
export const addAddress = (address: string, addressNumber: string, deliveryPrice: number) => {
  return http({
    method: 'POST',
    url: `/address/addAddress`,
    data: {
      address,
      addressNumber,
      deliveryPrice,
    },
  })
}

// 删除地址信息
export const deleteAddress = (id: number) => {
  return http({
    method: 'DELETE',
    url: `/address/deleteAddress/${id}`,
  })
}

// 获取所有地址信息
export const getAddress = () => {
  return http<AdressItem[]>({
    method: 'GET',
    url: `/address/getAddress`,
  })
}

// 修改地址信息
export const updateAddress = (
  id: number,
  address: string,
  addressNumber: string,
  deliveryPrice: number,
) => {
  return http({
    method: 'POST',
    url: `/address/updateAddress`,
    data: {
      id,
      address,
      addressNumber,
      deliveryPrice,
    },
  })
}

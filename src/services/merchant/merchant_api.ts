import { http } from '@/utils/http'
import type { TokenType } from '@/types/login_register'
import type { MerchantInfo, University, ReviewsType } from '@/types/merchant_return'
export const merchant_Login_pp = (phoneNumber: string, password: string) => {
  return http<TokenType>({
    method: 'POST',
    url: '/merchant/login/password',
    data: {
      phoneNumber,
      password,
    },
  })
}

export const merchant_Login_pv = (phoneNumber: string, validationCode: string) => {
  return http<TokenType>({
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
    url: `/merchant/getCaptcha?phoneNumber=${phoneNumber}`,
  })
}

export const merchant_register = (
  phoneNumber: string,
  realName: string,
  name: string,
  address: string,
  password: string,
  collegeId: string,
  detailedAddress: string,
  businessHours: string,
  contactPhone: string,
  discription: string,
  logo: string,
) => {
  return http({
    method: 'POST',
    url: '/merchant/register',
    data: {
      address,
      collegeId,
      detailedAddress,
      name,
      password,
      phoneNumber,
      realName,
      businessHours,
      contactPhone,
      discription,
      logo,
    },
  })
}

export const merchant_forget = (phoneNumber: string, newPassword: string) => {
  return http({
    method: 'POST',
    url: '/merchant/findPassword',
    data: { phoneNumber, newPassword },
  })
}

export const GetMerchantInfo = () => {
  return http<MerchantInfo>({
    method: 'GET',
    url: '/merchant/merchant_info',
  })
}

export const ChangeMerchantInfo = (changeData: MerchantInfo) => {
  return http({
    method: 'PUT',
    url: '/merchant/merchant_changerinfo',
    data: changeData,
  })
}

export const updateMerchantOperationStatus = (
  id: number, //商户的唯一标识符
  operationStatus: number, //商家的运营状态，0表示正常营业，1表示暂停营业
) => {
  return http({
    method: 'PUT',
    url: '/merchant/updateMerchantOperationStatus',
    data: {
      id,
      operationStatus,
    },
  })
}

export const merchant_checkCode = (phoneNumber: string, validationCode: string) => {
  return http({
    method: 'POST',
    url: '/merchant/ValidCaptcha',
    data: {
      phoneNumber,
      validationCode,
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

export const GetUniversity = () => {
  return http<University>({
    method: 'GET',
    url: '/common/getUniversityList',
  })
}

export const GetRegion = (id: string) => {
  return http<{ region: string; regionId: string }[]>({
    method: 'GET',
    url: `/common/getPlace/${id}`,
  })
}

/**
 * @店铺评价与通知
 */

//获取所有顾客评级
export const getAllReviews = () => {
  return http<ReviewsType[]>({
    method: 'GET',
    url: `/merchant/statistics/getAllReviews`,
  })
}

//获取所有通知
export const getNoticeByTimeAndType = (date: string, type: number) => {
  return http<
    {
      type: number //通知类型，系统公告1，管理员公告2
      content: string
      time: string
    }[]
  >({
    method: 'GET',
    url: `/merchant/statistics/getNoticeByTimeAndType`,
    data: {
      date, //查询公告类型，全部0，系统公告1，管理员公告2
      type,
    },
  })
}

//联系客服
export const contactService = (content: string) => {
  return http({
    method: 'POST',
    url: `/merchant/statistics/content`,
    data: {
      content,
    },
  })
}

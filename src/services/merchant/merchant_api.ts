import { http } from '@/utils/http'
import type { TokenType } from '@/types/login_register'
import type { MerchantInfo, URL } from '@/types/merchant_return'
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
  id: string, //商户的唯一标识符
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
  return http({
    method: 'GET',
    url: '/getUniversityList',
  })
}

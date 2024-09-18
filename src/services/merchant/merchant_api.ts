import { http } from '@/utils/http'
import type { TokenType } from '@/types/login_register'
import type { MerchantInfo } from '@/types/merchant_return'
import { METHODS } from 'http'
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

export const GetMerchantInfo = () => {
  return http<MerchantInfo>({
    method: 'GET',
    url: '/merchant/merchant_info',
  })
}

export const ChangeMerchantInfo = (
  businessHours: string, //营业时间，用于显示

  contactPhone: string, //店铺的联系电话

  discription: string, //店铺详细信息

  id: number, //商户的唯一标识符

  logo: string, //店铺logo照片url，用于显示
  merchantAddress: string, //店铺详细地址

  merchantName: string, //店面名称，用于显示

  realName: string, //店主真实姓名，用于订单处理和身份验证
) => {
  return http({
    method: 'PUT',
    url: '/merchant/merchant_changerinfo',
    data: {
      businessHours,
      contactPhone,
      discription,
      id,
      logo,
      merchantAddress,
      merchantName,
      realName,
    },
  })
}

export const pdateMerchantOperationStatus = (
  merchantId: number, //	商户的唯一标识符
  operationStatus: number, //	商家的运营状态，0表示正常营业，1表示暂停营业
) => {
  return http({
    method: 'PUT',
    url: '/merchant/updateMerchantOperationStatus',
    data: {
      merchantId,
      operationStatus,
    },
  })
}

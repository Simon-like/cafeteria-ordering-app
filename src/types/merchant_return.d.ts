export type MerchantInfo = {
  merchantAddress: string //店铺详细地址
  businessHours: string //营业时间，用于显示
  contactPhone: string //店铺的联系电话
  discription: string //店铺详细信息
  logo: string //店铺logo照片url，用于显示
  id: string //商户的唯一标识符
  merchantName: string //店面名称，用于显示
  operationStatus: string //商家的运营状态，0表示正常营业，1表示暂停营业
  realName: string //店主真实姓名，用于订单处理和身份验证
}

export type URL = {
  url: string
}

export type MerchantInfo = {
  address: string //店铺详细地址	string
  businessHours: string //营业时间，用于显示	string
  contactPhone: string //店铺的联系电话	string
  deleteStatus: number //0表示未删除（默认），1表示删除	integer(int32)
  discription: string //店铺详细信息	string
  logo: string //店铺logo照片url，用于显示	string
  merchantId: number //商户的唯一标识符	integer(int64)
  name: string //店面名称，用于显示	string
  operationStatus: number //商家的运营状态，0表示正常营业，1表示暂停营业	integer(int32)
  realName: string //店主真实姓名，用于订单处理和身份验证	string
  version: number //乐观锁	integer(int32)
}

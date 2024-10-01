export type MerchantInfo = {
  address: string //店铺详细地址
  businessHours: string //营业时间，用于显示
  contactPhone: string //店铺的联系电话
  discription: string //店铺详细信息
  logo: string //店铺logo照片url，用于显示
  id: string //商户的唯一标识符
  name: string //店面名称，用于显示
  operationStatus: number //商家的运营状态，0表示正常营业，1表示暂停营业
  realName: string //店主真实姓名，用于订单处理和身份验证
}

export type URL = {
  url: string
}
<<<<<<< HEAD

export type University = {
  collegeId: string
  collegeName: string
}

// 菜品分组信息
export type categoryData = {
  categoryId: number
  categoryName: string
  categoryPriority: number
  dishNumber: number
}

// 菜品信息
export type dishData = {
  id: number
  dishName: string
  dishDescription: string
  price: number
  discount: number
  discountedPrice: number
  imageUrl: string
  categoryList: categoryData[]
  dishStatus: number // 菜品的状态，热销0、缺货1、下架2，其他3
  isDiscounted: number // 是否打折。0表示不打折，1表示打折
  isDeliver: number // 单点是否配送。0表示单点不配送，1单点配送
  todayInventory: number
  specifications: string[] // 规格
=======
export type University = {
  collegeId: string
  collegeName: string
>>>>>>> 18ecca9b937b5e2101fc32b479b4d5caefafe377
}

export type MerchantInfo = {
  address: string //店铺区域
  businessHours: string //营业时间，用于显示
  contactPhone: string //店铺的联系电话
  detailAddress: string // 店铺详细地址
  discription: string //店铺详细信息
  id: string //商户的唯一标识符
  logo: string //店铺logo照片url，用于显示
  name: string //店面名称，用于显示
  realName: string //店主真实姓名，用于订单处理和身份验证
}

export type URL = {
  url: string
}

export type University = {
  collegeId: string
  collegeName: string
}

// 菜品分组信息
export type categoryType = {
  categoryId: number
  categoryName: string
  categoryPriority: number
  dishNumber: number
}

// 规格选项信息
export type specOptionsItem = {
  optionsName: string
  price: number
}

// 规格信息
export type specItem = {
  specTitle: string
  isEssential: boolean
  id: number
  specOptions: specOptionsItem[]
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
  categoryList: categoryType[]
  dishStatus: number // 菜品的状态，热销0、缺货1、下架2，其他3
  isDiscounted: number // 是否打折。0表示不打折，1表示打折
  isDeliver: number // 单点是否配送。0表示单点不配送，1单点配送
  todayInventory: number
  specList: specItem[] // 规格S
}

//菜单信息
export type MenuItem = {
  dishId: number
  dishName: string
  dishNumber: number
  dishSpecList: string[]
  dishPrice: number
}

// 订单信息
export type OrderItem = {
  orderID: number //订单ID，用于后续请求操作
  orderCode: string // 订单编号，有规定格式的一个编码
  orderNumber: number //订单序号，每个订单有先后顺序，每一天第一个订单为1号，往后递增
  customer: string // 客户昵称
  orderNotes: string // 订单备注
  orderTime: string // 下单时间，精确月-日-时-分
  phoneNumber: string // 顾客电话
  payMethod: number //支付方式，微信支付0，支付宝支付1
  menu: MenuItem[]
  totalPrice: number //总价
  coupon: number
  actualPrice: number // 实际支付金额，总价减去优惠券
  orderType: number // 订单类型，外卖0，堂食1
  orderStatus: number // 订单状态，待处理订单0，已确认订单1（点击接单还未完成），已完成的订单2（已确认的订单点击完成），已取消订单3（点击复原退回到状态1），已退款订单4
  addressID: number // 配送地址ID，当oderType=0时有此字段内容,否则为-1
  address: string // 配送地址，当oderType=0时有此字段内容,否则为空字符''
  addressNumber: string //配送地址编号，当oderType=0时有此字段内容,否则为空字符''
}

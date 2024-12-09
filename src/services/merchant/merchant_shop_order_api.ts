import { http } from '@/utils/http'
import type { OrderItem, MenuItem, specItem, dishData } from '@/types/merchant_return'

/**
 * @description 商户端店铺管理订单管理接口
 * @author 应东林
 * @date 2024-10-31
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-31
 */

// 按订单状态获取全部订单
export const getAllOrdersByStatus = (
  orderType: number, //订单类型，外卖0，堂食1
  orderStatus: number, //订单状态，待处理订单0，已确认订单1（点击接单还未完成），已完成的订单2（已确认的订单点击完成），已取消订单3（点击复原退回到状态1），已退款订单4
  orderTime: string, //下单时间，查询的细度为月-日,默认为今日
  orderContent: string, // 模糊查询的内容，支持订单编号和顾客姓名
) => {
  return http<OrderItem[]>({
    method: 'POST',
    url: '/merchant/OrdersManage',
    data: {
      orderType,
      orderStatus,
      orderTime,
      orderContent,
    },
  })
}

// // 待定ing
// export const confirmtheOrder = (orderId) => {
//   return http({
//     method: 'POST',
//     url: '/merchant/OrdersManage',
//     data: {
//       orderId,
//     },
//   })
// }

/**
 * 财务管理接口
 */
// 获取某日总金额流水
export const getTotalAmountRollover = (orderTime: string) => {
  return http({
    method: 'POST',
    url: `/merchant/statistics/getTotalAmountRollover`,
    data: {
      orderTime,
    },
  })
}

// 获取历史订单
export const getCompletedOrRefund = (orderTime: string, status: number) => {
  return http<
    {
      orderId: number
      orderCode: string // 订单编号，有规定格式的一个编码
      orderTime: string
      payMethod: number // 支付方式，微信支付0，支付宝支付1
      actualPrice: number // 实际支付金额
      orderStatus: number //2->已支付;4->已退款;
    }[]
  >({
    method: 'POST',
    url: `/merchant/statistics/getCompletedOrRefund`,
    data: {
      orderTime,
      status,
    },
  })
}

import { http } from '@/utils/http'
import type { OrderItem, MenuItem, specItem, dishData } from '@/types/merchant_return'

/**
 * @description 商户端店铺管理订单管理接口
 * @author 应东林
 * @date 2024-10-31
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-12-16
 */

// 按订单状态获取四个订单
export const getOrdersByStatus = (
  orderType: number, //订单类型，外卖0，堂食1
  orderStatus: number,
  //订单状态，待处理订单2，已确认订单3（点击接单还未完成），
  //已完成的订单4（已确认的订单点击完成），已取消订单7（点击复原退回到状态1），已退款订单8
  orderTime: string, //下单时间，查询的细度为月-日,默认为今日
  orderNumber_latest: number, // 提供的最大序号
) => {
  return http<{
    list: OrderItem[]
    orderInventory: number
  }>({
    method: 'POST',
    url: '/orders/merchant/getOrders',
    data: {
      orderType,
      orderStatus,
      orderTime,
      orderNumber_latest,
    },
  })
}

// 通过查询准确订单号获得查询订单
export const getOrdersByNumbers = (orderNumber: string) => {
  return http<OrderItem>({
    method: 'GET',
    url: `/orders/merchant/getOrdersByNumbers/${orderNumber}`,
  })
}

// 确认接单
export const confirmTheOrder = (orderId: number) => {
  return http<{
    CONFIRMED: number
    TO_BE_CONFIRMED: number
  }>({
    method: 'POST',
    url: '/orders/merchant/ConfirmTheOrder',
    data: {
      orderId,
    },
  })
}

// 完成已确认订单
export const completeOrder = (orderId: number) => {
  return http<{
    CONFIRMED: number
    TO_BE_CONFIRMED: number
  }>({
    method: 'POST',
    url: '/orders/merchant/CompleteOrder',
    data: {
      orderId,
    },
  })
}

// 退款已确认订单
export const refundsConfirmedOrders = (orderId: number) => {
  return http<{
    CONFIRMED: number
    TO_BE_CONFIRMED: number
  }>({
    method: 'POST',
    url: '/orders/merchant/RefundsConfirmedOrders',
    data: {
      orderId,
    },
  })
}
// 主动获取状态数量
export const countTwoStatus = () => {
  return http<{
    CONFIRMED: number
    TO_BE_CONFIRMED: number
  }>({
    method: 'GET',
    url: '/orders/merchant/CountTwoStatus',
  })
}

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

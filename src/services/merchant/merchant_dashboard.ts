import { http } from '@/utils/http'
/**
 * @description 商户端首页大屏
 * @author 应东林
 * @date 2024-10-12
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-10-12
 */

// 上一周最佳菜品统计
export const getTopSellingDish = () => {
  return http<
    {
      dishName: string
      dishSales: number
    }[]
  >({
    method: 'GET',
    url: '/merchant/statistics/search/TopSellingDish',
  })
}

// 最近一周每天的日销售单数统计
export const getSalesTrends = () => {
  return http<{ dateList: string[]; orderCountList: number[] }>({
    method: 'GET',
    url: '/merchant/statistics/salesTrends',
  })
}

// 看板信息统计
export const getStatistics = () => {
  return http<{
    digiSignageInfoList: {
      title: string
      value: number
      changeValue: number
    }[]
    platformFees: number
  }>({
    method: 'GET',
    url: '/merchant/statistics',
  })
}

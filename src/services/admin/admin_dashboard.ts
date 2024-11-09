import { http } from '@/utils/http'
/**
 * @description 管理端首页大屏
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
    url: '/administer/statistics/search/TopSellingDish',
  })
}

// 销量趋势统计
export const getSalesTrends = () => {
  return http<
    {
      orderTime: string
      salesNumber: number
    }[]
  >({
    method: 'GET',
    url: '/administer/statistics/search/salesTrends',
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
    url: '/administer/statistics',
  })
}

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
    method: 'POST',
    url: '',
  })
}

import { http } from '@/utils/http'
/**
 * @description 商户管理
 * @author 钟礼豪
 * @date 2024-12-18
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime 2024-12-19
 */

//====菜品管理
//获取商家新增菜品审核信息
export const getAddDishInfo = (merchantId: number) => {
  return http({
    method: 'GET',
    url: `/administer/statistics/getAddDishInfo?merchantId=${merchantId}`,
  })
}
//新增菜品审核
export const auditAddDish = (dishId: number, result: boolean) => {
  return http({
    method: 'GET',
    url: `/administer/statistics/auditAddDish?dishId=${dishId}&result=${result}`,
  })
}
//获取商家修改菜品价格审核信息
export const getUpdateDishInfo = (merchantId: number) => {
  return http({
    method: 'GET',
    url: `/administer/statistics/getUpdateDishInfo?merchantId=${merchantId}`,
  })
}
//修改菜品价格审核
export const auditUpdateDish = (dishId: number, result: boolean) => {
  return http({
    method: 'GET',
    url: `/administer/statistics/auditUpdateDish?dishId=${dishId}&result=${result}`,
  })
}

import { http } from '@/utils/http'
import type { MerchantInfo } from '@/types/merchant_return'
import type { MerchantAudit } from '@/types/admin_return'
/**
 * @description 商户管理
 * @author 钟礼豪
 * @date 2024-12-18
 * @lastModifiedBy 钟礼豪
 * @lastModifiedTime 2024-12-19
 */

//获取区域商家信息
export const getMerchantInfo = (college: string) => {
  return http<MerchantInfo>({
    method: 'GET',
    url: `/administer/statistics/MerchantManage?college=${college}`,
  })
}

//====菜品管理
//获取商家所有请求信息
export const getAllRequestInfo = () => {
  return http({
    method: 'GET',
    url: '/administer/statistics/getAllRequestInfo',
  })
}
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

//获取某商家菜单
export const getMerchantDishes = (merchantId: number) => {
  return http({
    method: 'POST',
    url: '/administer/dish/GetAllDishes',
    data: {
      merchantId,
    },
  })
}
//下架菜品
export const downDish = (dishId: number, merchantId: number) => {
  return http({
    method: 'POST',
    url: '/administer/dish/downDish',
    data: {
      dishId,
      merchantId,
    },
  })
}

//获取商家审核信息
export const getMerchantAuditInfo = () => {
  return http<MerchantAudit[]>({
    method: 'GET',
    url: '/administer/statistics/getMerchantAuditInfo',
  })
}
//上传商家审核结果
export const merchantAudit = (flag: boolean, id: number) => {
  return http({
    method: 'POST',
    url: '/administer/statistics/AuditMerchant',
    data: {
      flag,
      id,
    },
  })
}
//修改平台抽成
export const updateCommission = (
  commission: number,
  commissionType: number,
  merchantId: number,
) => {
  return http({
    method: 'GET',
    url: `/administer/statistics/updateCommission?commission=${commission}&commissionType=${commissionType}&merchantId=${merchantId}`,
  })
}

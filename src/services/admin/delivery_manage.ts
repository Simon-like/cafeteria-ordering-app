import { http } from '@/utils/http'
import type { CourierFeedback, CourierInfo } from '@/types/admin_return'
/**
 * @description 外卖员管理
 * @author 钟礼豪
 * @date 2024-11-25
 * @lastModifiedBy 钟礼豪
 */
//外卖员申述
export const diliver_courier = () => {
  return http<CourierFeedback[]>({
    method: 'GET',
    url: '/administer/staticis/Courier',
  })
}
//外卖员审核
export const diliver_audit = () => {
  return http<[id: string, idCardNumber: string, realName: string]>({
    method: 'GET',
    url: '/administer/statistics/CourierAudit',
  })
}

export const diliver_auditResult = (msg: string) => {
  return http({
    method: 'POST',
    url: '/administer/doing',
    data: {
      msg,
    },
  })
}
//获取外卖员信息
export const diliver_info = () => {
  return http<CourierInfo[]>({
    method: 'GET',
    url: '/administer/statistics/getCourierInfo',
  })
}

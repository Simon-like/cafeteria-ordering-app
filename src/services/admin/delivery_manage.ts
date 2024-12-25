import { http } from '@/utils/http'
import type { FeedBackInfo, DataItem } from '@/types/admin_return'
/**
 * @description 外卖员管理
 * @author 钟礼豪
 * @date 2024-11-25
 * @lastModifiedBy 钟礼豪
 */
//获取外卖员申述信息
export const diliver_courier = () => {
  return http<FeedBackInfo[]>({
    method: 'GET',
    url: '/administer/statistics/getAuditFeedBack',
  })
}
//上传外卖员申述结果
export const courier_audit = (flag: boolean, id: number) => {
  return http({
    method: 'POST',
    url: '/administer/statistics/AuditFeedBack',
    data: {
      flag,
      id,
    },
  })
}

//获取外卖员审核信息
export const diliver_audit = () => {
  return http<[id: string, idCardNumber: string, realName: string]>({
    method: 'GET',
    url: '/administer/statistics/getCourierAuditInfo',
  })
}
//上传外卖员审核结果
export const diliver_auditResult = (flag: boolean, id: number) => {
  return http({
    method: 'POST',
    url: '/administer/statistics/AuditCourier',
    data: {
      flag,
      id,
    },
  })
}
//获取外卖员信息
export const diliver_info = () => {
  return http<DataItem[]>({
    method: 'GET',
    url: '/administer/statistics/getCourierInfo',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

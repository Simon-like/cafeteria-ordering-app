import { http } from '@/utils/http'
import type { categoryData, dishData } from '@/types/merchant_return'

/**
 * @description 商户端店铺管理菜品管理接口
 * @author 应东林
 * @date 2024-09-30
 * @lastModifiedBy 应东林
 * @lastModifiedTime  2024-09-30
 */

// 商户端分类型、分组别查看菜品信息
export const getDishByGroup = (
  dishStatus: number = 4, // 菜品的状态，热销0、缺货1、下架2，其他3，不考虑这个因素4
  categoryId: number | null = null, // 分类ID，不考虑就填Null
  isDiscounted: number = 2, // 是否打折。0表示不打折，1表示打折，2不考虑这个
  isDeliver: number = 2, // 单点是否配送。0表示单点不配送，1单点配送,2不考虑这个
) => {
  return http<dishData[]>({
    method: 'GET',
    url: `/merchant/dish/getDishByGroup?dishStatus=${dishStatus}&categoryId=${categoryId}&isDiscounted=${isDiscounted}&isDeliver=${isDeliver}`,
  })
}

// 新增菜品
export const addDish = (
  description: string,
  dishDescription: string,
  dishName: string,
  imageUrl: string,
  price: number,
  specifications: string[],
) => {
  return http({
    method: 'POST',
    url: `/merchant/dish/addDish`,
    data: {
      description,
      dishDescription,
      dishName,
      imageUrl,
      price,
      specifications,
    },
  })
}

// 在某一分组下新增菜品
export const addDishInCategory = (categoryId: number, dishIdList: number[]) => {
  return http({
    method: 'POST',
    url: `/merchant/dish/addDishInCategory`,
    data: {
      categoryId,
      dishIdList,
    },
  })
}

// 获取所有菜品信息
export const getAll = () => {
  return http<dishData[]>({
    method: 'GET',
    url: `/merchant/dish/getAll`,
  })
}

// 下架菜品
export const downDish = () => {
  return http({
    method: 'PUT',
    url: `/merchant/dish/downDish`,
  })
}

// 按ID查询菜品
export const getDishById = (dishId: number) => {
  return http<dishData>({
    method: 'GET',
    url: `/merchant/dish/getDishById?dishId=${dishId}`,
  })
}
// 修改菜品、不需要审核
export const updateDishNot = (
  id: number,
  dishName: string,
  dishDescription: string,
  discount: number,
  imageUrl: string,
  categoryList: categoryData[],
  dishStatus: number, // 菜品的状态，热销0、缺货1、下架2，其他3
  isDiscounted: number, // 是否打折。0表示不打折，1表示打折
  isDeliver: number, // 单点是否配送。0表示单点不配送，1单点配送
  todayInventory: number,
  specifications: string[],
) => {
  return http({
    method: 'PUT',
    url: `/merchant/dish/updateDishNot`,
    data: {
      id,
      dishName,
      dishDescription,
      discount,
      imageUrl,
      categoryList,
      dishStatus, // 菜品的状态，热销0、缺货1、下架2，其他3
      isDiscounted, // 是否打折。0表示不打折，1表示打折
      isDeliver, // 单点是否配送。0表示单点不配送，1单点配送
      todayInventory,
      specifications,
    },
  })
}
// 修改菜品信息、需要审核
export const updateDish = (dishId: number, price: number) => {
  return http({
    method: 'POST',
    url: `/merchant/dish/updateDish`,
    data: {
      dishId,
      price,
    },
  })
}
// 商户端获取各类型下的菜品数量
export const getAllCategoryNum = () => {
  return http<{
    all: number
    soldOut: number
    discount: number
    discontinued: number
    dineIn: number
    selling: number
  }>({
    method: 'GET',
    url: `/merchant/dish/getAllCategoryNum`,
  })
}

// 获取分组列表信息
export const getAllCategory = () => {
  return http<categoryData[]>({
    method: 'GET',
    url: `/merchant/dish/getAllCategory`,
  })
}

// 商户端删除分组
export const deleteCategory = (catogoryId: number) => {
  return http({
    method: 'DELETE',
    url: `/merchant/dish/deleteCategory?catogoryId=${catogoryId}`,
  })
}

// 商户端新增菜品分组

export const addCategory = (categoryName: string, categoryPriority: number) => {
  return http({
    method: 'GET',
    url: `/merchant/dish/addCategory?categoryName=${categoryName}&categoryPriority=${categoryPriority}`,
  })
}

// 商户端修改分组信息

export const updateCategory = (
  categoryName: string,
  categoryPriority: number,
  categoryId: number,
) => {
  return http({
    method: 'PUT',
    url: `/merchant/dish/updateCategory`,
    data: {
      categoryName,
      categoryPriority,
      categoryId,
    },
  })
}

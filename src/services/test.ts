import { http } from '@/utils/http'

export const getTestAPI = (testData:number = 1)=>{
	return http({
		method:'GET',
		url:'/home/test',
		data:{
			testData,
		},
	})
}
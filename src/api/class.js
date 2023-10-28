import request from "../utils/axios"

// 请求班期列表
export function classListRequest(params){
    return request({
        url: "/api/class/classList", 
        method: "get",
        params
    })
} 
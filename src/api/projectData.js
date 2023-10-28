import request from "../utils/axios"

// 请求项目的功能列表数据
export function projectFeatureRequest(){
    return request({
        url: "/api/projectData/feature",
        method: "get"
    })
}


// 请求项目的历史版本列表数据
export function projectVersionRequest(){
    return request({
        url: "/api/projectData/version",
        method: "get"
    })
}
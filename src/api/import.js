import request from "../utils/axios"

// 下载模板
export function downloadTemplateRequest(){
    return request({
        url: "/api/import/downloadTemplate", 
        method: "get",
        responseType: "blob"  // 指定响应的文件数据处理为blob对象

        // Binary Large Object
    })
} 
export function importResultListRequest(params){
    return request({
        url: "/api/import/importResultList", 
        method: "get",
        params
    })
} 

import request from "../utils/axios"
// 登录相关的请求都在这.
// 强调！！！前端路由不要跟后端路由设计的一样


// 请求登录
export function loginRequest(data){
    return request({
        url: "/api/login", 
        method: "post",
        data
    })
} 


/* 
    跨域：
        1. 服务端配置允许跨域 
        2. 本地JSONP
        3. 代理服务器

*/
import request from "../utils/axios"

// 新增文章
export function addArticleRequest(data){
    return request({
        url: "/api/article/addArticle", 
        method: "post",
        data
    })
} 

// 获取文章列表
export function getArticleListRequest(params){
    return request({
        url: "/api/article/articleList", 
        method: "get",
        params
    })
} 

// 删除文章
export function deleteArticleRequest(data){
    return request({
        url: "/api/article/deleteArticle", 
        method: "delete",
        data
    })
} 

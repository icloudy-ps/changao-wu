import request from "../utils/axios"

// 请求课程列表
export function courseListRequest(params){
    return request({
        url: "/api/course/courseList", 
        method: "get",
        params
    })
} 

// 修改课程基本信息
export function reviseCourseInfoRequest(data){
    return request({
        url: "/api/course/reviseCourseInfo", 
        method: "post",
        data
    })
} 
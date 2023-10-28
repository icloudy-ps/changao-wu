import request from "../utils/axios"

export function studentListRequest(params){
    return request({
        url: "/api/student/studentList",
        method: "get",
        params
    })
}
// 请求可以做筛选学员数据的条件数据
export function conditionClassificationRequest(params){
    return request({
        url: "/api/student/courseClassification",
        method: "get"
    })
}



// 更新学员信息数据
export function updataStudentRequest(data){
    return request({
        url: "/api/student/updataStudent",
        method: "post",
        data
    })
}

export function updataStudentClassRequest(data){
    return request({
        url: "/api/student/updataStudentClass",
        method: "post",
        data
    })
}
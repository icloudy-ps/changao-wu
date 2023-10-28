import request from "../utils/axios"

export function userInfoRequest(){
    return request({
        url: "/api/role/user",
        method: "get"
    })
}
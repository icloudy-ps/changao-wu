import request from "../utils/axios"

export function permissionMenuRequest(){
    return request({
        url: "/api//route/menu",
        method: "get"
    })
}
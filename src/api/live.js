import request from "../utils/axios"

// 删除该节直播(项)
export function deleteLiveItemRequest(data){
    return request({
        url: "/api/live/deleteLiveItem", 
        method: "delete",
        data
    })
} 

// 新增1节直播(项)
export function addLiveItemRequest(data){
    console.log("好消息");
    return request({
        url: "/api/live/addLiveItem", 
        method: "post",
        data
    
    })
} 
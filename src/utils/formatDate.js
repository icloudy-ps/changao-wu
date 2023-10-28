/* 格式化日期 */

// 参数: 毫秒数。  返回的时间格式：2023-07-01 20:56:05
export const formatDate = (time) => {
    let date = new Date(time / 1),
        year = date.getFullYear(),
        month = ( "0" + (date.getMonth() + 1)).slice(-2),
        day = ( "0" + date.getDate()).slice(-2),
        hour = ( "0" + date.getHours()).slice(-2),
        minute = ( "0" + date.getMinutes()).slice(-2),
        second = ( "0" + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

// 参数: 毫秒数。  返回的时间格式：2023-07-01 周六
const weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
export const formatDateWeek = (time) => {
    let date = new Date(time / 1),
        year = date.getFullYear(),
        month = ( "0" + (date.getMonth() + 1)).slice(-2),
        day = ( "0" + date.getDate()).slice(-2),
        week = weekArr[date.getDay()];
    return `${year}-${month}-${day} ${week}`
}

// 参数: 毫秒数。  返回的时间格式：20:56:05
export const formatTime = (time) => {
    let date = new Date(time / 1),
        hour = ( "0" + date.getHours()).slice(-2),
        minute = ( "0" + date.getMinutes()).slice(-2),
        second = ( "0" + date.getSeconds()).slice(-2);
    return `${hour}:${minute}:${second}`
}

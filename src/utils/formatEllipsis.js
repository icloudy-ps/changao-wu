// 超出指定字数的字符串内容以省略号显示
export const textOverfllowEllipsis = (str, len) => {
    if(str.length > len) return str.substring(0, len) + "......"
}
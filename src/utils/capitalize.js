// 字符串首字母大写
export default ([a,...r]) =>{
    return a.toUpperCase() + r.join("")
}
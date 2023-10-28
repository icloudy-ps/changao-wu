// 存储到本地
export const setStorage = (key, value) => {
    if(typeof value === "object" && value !== null) value = JSON.stringify(value)
    localStorage.setItem(key, value)
}

// 获取本地存储中的数据
export const getStorage = (key) => {
    const data = localStorage.getItem(key)
    try{
        // 非数组/非对象格式的字符串被parse转换的时候通常会报错
        return JSON.parse(data)
    }catch(err){
        // 直接返回取到的值
        return data
    }
}

// 删除本地存储中对应的数据
export const removeStorage = (key) => {
    localStorage.removeItem(key)
}

// 清空本地存储
export const removeAllStorage = () => {
    localStorage.clear()
}

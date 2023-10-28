import axios from "axios"
import { useUserStore } from "../stores/user"

// 创建axios应用实例
const request = axios.create({
    withCredentials: true, // 允许携带cookie
    timeout: 5000, // 请求超时的时间
})

// 请求拦截器: 在请求发送给服务端之前批量做一些处理。
// 比如弹出loadding框、携带cookie(token(鉴权/持久化登录))、批量添加请求头
request.interceptors.request.use(
    config => {
        // 给所有请求的请求头添加token
        config.headers = { "Authorization" : useUserStore().token}
        return config
    }
)

// 响应拦截器：在接收到服务端响应来的结果时做预处理,处理完后的结果才会在实际代码中体现。
// 对数据做处理、对不同转换码的响应情况做处理
request.interceptors.response.use(
    // 成功状态的响应会触发第1个回调
    res => {
        // 必须释放响应对象
        return res
    },

    // 失败状态的响应会触发第2个回调
    err => {
        // console.log("err", err)
        // 当token过期或者无效时, 清空store/本地存储中的tokenn
        if(err.response.status === 401){
            // 登出, 清空token和本地存储
            useUserStore().loginOut()
        }
    }
)

export default request
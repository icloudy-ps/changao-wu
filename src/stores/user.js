import { defineStore } from "pinia"
import { loginRequest } from "@/api/login"
import { userInfoRequest } from "@/api/user"
import { ElMessage } from 'element-plus'
import { setStorage, getStorage, removeAllStorage } from "../utils/storage"
import router from "@/router/index"
import {useRouteStore} from "./routes"

export const useUserStore = defineStore("user", {
    state() {
        return {
            token: getStorage("token") || null, // 本地存储中有token就取, 没有就为null
            userInfo: null
        }
    },
    actions: {
        // 处理登录
        async reqLogin(loginFormData) {
            // 发起登录请求, 将表单数据提交给服务端, 获取到token(令牌)
            const { data } = await loginRequest(loginFormData).then(res => res)
            console.log("data : ", data)
            // 登录成功,
            if (data.code === 200) {
                // 弹出登录成功框
                ElMessage.success(data.msg)

                // 将token / userInfo存储到store中
                this.token = data.token
                this.userInfo = data.userInfo

                // 将token存储到本地存储, 方便后续请求时可以直接携带token到服务端进行鉴权, 实现持久化登录
                setStorage("token", data.token)

                // 判断用户的权限: 请求不同权限对应的路由数据, 将路由动态的添加到router路由中
                // const routeStore = useRouteStore()
                // await routeStore.generateRoutes()

                // 跳转到 / 
                router.push("/")
            } else {
                // 登录失败, 弹出提示框告知用户
                ElMessage.error(data.msg)
            }
        },

        // 获取用户信息
        getUserInfo() {
            return userInfoRequest()
                .then(({data}) => {
                    // 将用户信息存储到pinia
                     this.userInfo = data.data   
                })
                .catch(err => {
                    ElMessage.error(data.data.msg)
                })
        },

        // 登出
        async loginOut() {
            // 清空store中的token
            this.token = null
            // 清空本地storage
            await removeAllStorage()
            // 清空store中的userInfo
            this.userInfo = null
            // 强制刷新页面 / 强制导航到login
            await router.go(0)
            // router.push("/login")

        }
    }
})


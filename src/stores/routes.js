import { defineStore } from "pinia"
import { permissionRoutes } from "../router"
export const useRouteStore = defineStore("route", {
    state(){
        return {
            menuRoutes: []  // 存储左侧菜单映射的权限路由
        }
    },
    actions: {
        // 根据用户权限, 动态添加权限路由到路由器上
        async generateRoutes() {
            // 假设从服务端请求到的权限路由
            this.menuRoutes = permissionRoutes
            this.menuRoutes.unshift({ path: "/profile", meta: { title: "首页", icon:"HomFilled" }})
            // 返回成功状态,并传递路由数组
            return Promise.resolve(this.menuRoutes)
        }
    }
})

// router.addRoute()  动态添加路由
// router.getRoutes() 获取所有的路由信息对象数组

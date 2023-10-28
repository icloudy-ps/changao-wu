import router from "@/router/index"
import { useUserStore } from "@/stores/user"
import { useRouteStore } from "@/stores/routes"
// 不重定向的白名单(公共路由)
const whiteList = ["/login"]

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()

    // 存在token
    if(userStore.token){
        // 禁止用户再访问到login, 重定向到 / 根路由
        if(/\/login/i.test(to.path)) return next("/")

        // 不存在userInfo: 说明刷新了页面 / 重新访问了网站
        if(!userStore.userInfo){
            // 基于token请求用户数据
            await userStore.getUserInfo()
        }

        const routeStore = useRouteStore()
        // 如果token存在, 但是pinia中不存在权限路由
        if(routeStore.menuRoutes.length <= 0){
            // 请求获取到左侧菜单对应的权限路由
            const permissionRoutes = await routeStore.generateRoutes()
            permissionRoutes.forEach(async r => {
                await router.addRoute(r)
            } )
            next(to.path)
        }else{
            next()      //放行
        }
    }else{
        // 不存在token: 访问/login就放行, 访问其它就重定向到/login
        whiteList.includes(to.path) ? next() : next("/login")
    }
})


/* 
    路由守卫：
        在token有效期内, 还需要展示login登录界面嘛？ 禁止用户再访问到login
        当token存在，但是userInfo不存在时, 基于token请求拿到当前用户信息

*/
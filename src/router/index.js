import { createRouter, createWebHistory } from "vue-router"
import Layout from "@/layout/Layout.vue"
import {shallowRef} from "vue"
// 路由配置数组(公开路由)
const routes = [
    {
        path: "/",
        name: "home",
        redirect: "/profile",
        component: Layout,
        children: [
            {
                path: "profile",
                meta: { title: "首页" },
                component: () => import("@/views/Profile/Profile.vue")
            }
        ]
    },
    {
        path: "/login",
        component: () => import("../views/Login/LoginView.vue")
    },
    // 404： 访问不存在的路由时进到这里处理.(避免黄色警告)
    {
        path: "/:pathAll(.*)",
        name: "404",
        component: () => import("../views/ErrorPage/404.vue")
    }
]

// 权限路由(访问需要权限, 通过addRoute动态添加(异步))
export const permissionRoutes = [
    // 学员管理
    {
        path: "/student",
        name: "student",
        redirect: '/student/studentList',
        component: shallowRef(Layout),
        meta: { title: "学员管理", icon: "UserFilled" },
        children: [
            {
                path: "/student/studentList",
                name: "studentList",
                meta: {
                    title: "学员列表",
                    icon: "List"
                },
                component: () => import("@/views/StudentList/StudentList.vue")
            },
            {
                path: "/student/import",
                name: "import",
                meta: {
                    title: "导入学员",
                    icon: "Plus"
                },
                component: () => import("@/views/StudentImport/StudentImport.vue")
            }
        ]
    },
    // 课程管理
    {
        path: "/course", // 课程
        name: "course",
        meta: { title: "课程", icon: "Grid" },
        component: shallowRef(Layout),
        redirect: '/course/courseManage',
        children: [
            {
                path: "/course/courseManage",
                meta: {
                    title: "课程管理",
                    icon: "Menu" 
                },
                component: () => import("@/views/CourseManage/CourseManage.vue")
            },
            {
                path: "/course/classManage",
                meta: {
                    title: "班期管理",
                    icon: "Histogram" 
                },
                component: () => import("@/views/ClassManage/ClassManage.vue"),
            },
            // {
            //     path: "/course/liveBroadcast",
            //     meta: {
            //         title: "我的直播",
            //         icon: "VideoCamera" 
            //     },
            //     component: () => import("@/views/LiveBroadcast/LiveBroadcast.vue"),
            // }
        ]
    },
    // 文章管理
    {
        path: "/article",
        meta: { title: "文章", icon: "Document"  },
        name: "article",
        component: shallowRef(Layout),
        redirect: '/article/list',
        children: [
            {
                path: "/article/list",
                meta: { title: "文章列表", icon: "Memo" },
                component: () => import("@/views/ArticleList/ArticleList.vue"),
            },
            {
                path: "/article/create",
                meta: { title: "创建文章", icon:"DocumentAdd" },
                component: () => import("@/views/CreateArticle/CreateArticle.vue"),
            },
            // {
            //     path: "/article/tag",
            //     meta: { title: "文章标签", icon:"CollectionTag" },
            //     component: () => import("@/views/ArticleTag/ArticleTag.vue"),
            // }
        ]
    }
]

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes // 路由配置数组
})


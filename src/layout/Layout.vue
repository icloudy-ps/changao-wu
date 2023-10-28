<template>
  <!-- class="openSidebar / hideSidebar" -->
  <div class="layout-wrapper" :class="[toggleSidebar, themeClass]">
    <!-- 固定的左侧侧边栏(菜单) -->
    <GuideSidebarMenu class="l-guide-sidebar-container" />

    <!-- 固定的右侧主体区域 -->
    <div class="r-main-container">
      <!-- 固定的顶部栏 -->
      <TopNavBar class="top-navbar" />
      <!-- 面包屑 or 标签栏 -->
      <PageTag class="top-tag-container" />
      <main class="r-content">
        <!-- 内容展示区(二级路由出口)。Component接收当前路由映射的路由组件对象 -->
        <router-view v-slot="{ Component }">
          <transition mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>
<script setup>
import GuideSidebarMenu from "./components/GuideSidebarMenu/index.vue";
import TopNavBar from "./components/TopNavBar/index.vue";
import PageTag from "./components/PageTag.vue";
import { useAppStore } from "../stores/app"
import { computed } from "vue"
import { useThemeStore } from "../stores/theme"

//切换折叠/展开的类名



const appStore = useAppStore()
const toggleSidebar = computed(() => appStore.sidebarOpend ? "hideSidebar" : "openSidebar")
// 获取当前主题类名

const themeStore = useThemeStore()
const themeClass = computed(() => themeStore.themeModel)


</script>
<style lang="less" scoped>
@import "../assets/styles/variable.module.less";
@import "./styles/layout.less";
</style>
<!-- 
  点击展开 / 折叠
  切换图标
  控制类名：  修改左侧侧边栏的宽度

 -->

<template>
  <div>
    <!-- 标题+logo -->
    <div class="logo-container">
      <img class="logo-img" :src="avatar" alt="logo" />
      <h1 class="logo-title">CMS_vue3</h1>
    </div>
    <!-- 菜单区域 -->
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="activeRoute"
      :router="true"
      text-color="menuTextColor"
      active-text-color="menuActiveTextColor"
      :unique-opened="true"
      background-color="transparent"
      :collapse="sidebarOpend"
      :collapse-transition="false"
    >
      <!-- 菜单项组件 -->
      <MenuItem v-for="item in menuRoutes" :key="item.path" :route="item" />
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from "vue";
import MenuItem from "./MenuItem.vue";
import { useRoute } from "vue-router";
import { useRouteStore } from "@/stores/routes";
import { useAppStore } from "@/stores/app";
import { useUserStore } from "@/stores/user";
import {useThemeStore} from "@/stores/theme"


const route = useRoute(); // 当前路由信息对象
const activeRoute = computed(() => route.path);

const routeStore = useRouteStore();
const menuRoutes = computed(() => routeStore.menuRoutes); // 权限路由数组

const appStore = useAppStore();
const sidebarOpend = computed(() => appStore.sidebarOpend);

// 处理头像
const userStore = useUserStore();
const avatar = computed(() => userStore.userInfo.avatar);

// 更具不同的主题模式，js设置不同的样式

// 菜单项高亮文字颜色
const themeStore = useThemeStore()
const themeModel = computed(()=>themeStore.themeModel)
const menuActiveTextColor = computed(()=>themeStore.lessVariables[themeModel.value+'MenuActiveTextColor'])
// 普通菜单项文字颜色
const menuTextColor = computed(()=>themeStore.lessVariables[themeModel.value+'SidebarTextColor'])

</script>

<style lang="less" scoped>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 50px;
  line-height: 50px;
  color: #bfcbd9;
  .logo-img {
    // width: 40%;
    height: 34px;
    vertical-align: middle;
  }
  .logo-title {
    letter-spacing: 2px;
    font-weight: 600;
    line-height: 50px;
    font-size: 15px;
    white-space: nowrap;
  }
}
</style>

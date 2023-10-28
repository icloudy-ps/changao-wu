<template>
  <div>
    <!-- 有子级时用这个 -->
    <el-sub-menu v-if="route.children && route.children.length > 0" :index="route.path">
      <!-- 当前菜单项的文本内容 -->
      <template #title>
        <SvgIcon :iconFileName="route.meta.icon" />
        <span>{{ route.meta.title }}</span>
      </template>

      <!-- 它的子项: 递归当前组件-->
      <MenuItem v-for="childrenItem in route.children" :key="childrenItem.path" :index="childrenItem.path"
        :route="childrenItem" />
    </el-sub-menu>

    <!-- 没有子级时用这个 -->
    <el-menu-item v-else :index="route.path">
      <!-- 当前菜单项的文本内容 -->
      <SvgIcon :iconFileName="route.meta.icon" />
      <span>{{ route.meta.title }}</span>
    </el-menu-item>
  </div>
</template>
<script setup>
import SvgIcon from "@/components/Svg-icon/SvgIcon.vue"
defineProps(["route"]);
</script>
<style lang="less" scoped></style>

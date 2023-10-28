<template>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item">
        <!-- 设置最后一项面包屑不为router-link， 避免重复进入同一个路由 -->
        <router-link :to="item.path" v-if="index !== breadcrumbData.length - 1">{{item.meta.title}}</router-link>
        <span v-else>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </template>
  <script setup>
  import { useRoute } from "vue-router";
  import { computed } from "vue";
  // 当前激活/访问的路由信息对象
  const route = useRoute();
  // 过渡掉没有meta.title的路由对象
  const breadcrumbData = computed(() =>
    route.matched.filter((item) => item.meta.title)
  );
  </script>
  
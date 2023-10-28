<template>
  <div id="warper-container">
    <el-config-provider :locale="zhCn">
      <!-- 一级出口内使用的所有element-plus组件都采用el-cofig-provider指定的locale（语言方案） -->
      <router-view />
    </el-config-provider>
  </div>
</template>

<script setup>
// 国际化语言方案
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-icon :size="iconSize" :color="iconColor">
    <!-- 动态控制要渲染的图标组件内容 -->
    <component :is="iconComponent"></component>
  </el-icon>
</template>

<script setup>
import * as Icons from "@element-plus/icons-vue"; // 引入全部图标(打包体积会增大点)
import { computed } from "vue";
const props = defineProps({
  iconFileName: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 16
  },
  color: {
    type: String,
    default: "inherit"
  }
})
const iconName = computed(() => props.iconFileName) // 图标组件名称
const iconSize = computed(() => props.size)
const iconColor = computed(() => props.color)
const iconComponent = computed(() => Icons[iconName.value]) // 图标组件对象

</script>
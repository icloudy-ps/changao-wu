<template>
    <!-- 主题切换图标（开关） -->
    <div class="theme-switch" @click="handleToggleTheme">
        <SvgIcon :icon-file-name="themeIconName" :size="28" />
    </div>
</template>
<script setup>
import { computed } from "vue"
import { useThemeStore } from "../../../stores/theme.js"
import SvgIcon from "../../../components/Svg-icon/SvgIcon.vue"
import capitalize from "../../../utils/capitalize";
// 主题图标组件名称
const themeStore = useThemeStore()
const themeIconName = computed(() => capitalize(themeStore.themeModel))

// 点击切换主题图标和主题模式
const handleToggleTheme = ()=>{ themeStore.toggleThemeModel()}

</script>

<template>
<div @click="handleSidebarState">
        <SvgIcon :icon-file-name="tosidebarIcon" :size="30"/>
        <span></span>
    </div>
</template>
<script setup>
import SvgIcon from "../../../components/Svg-icon/SvgIcon.vue"
import { useAppStore } from "../../../stores/app"
import {computed} from "vue"

const appStore = useAppStore()
// 点击切换侧边栏开关
const handleSidebarState = () => {
    appStore.toggleSidebarSwitch()
}

const tosidebarIcon = computed (()=>appStore.sidebarOpend?"Expand":"Fold")
</script>
<style>

</style>
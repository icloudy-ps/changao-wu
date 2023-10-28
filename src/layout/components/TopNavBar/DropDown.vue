<template>
    <el-dropdown trigger="click" @command="handleLogOut">
        <span class="el-dropdown-link">
           
            <el-avatar :size="34" :src="avatar" shape="circle" class="avatar" />
        </span>
        <!-- 下拉的菜单 -->
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>


<script setup>
import { computed } from "vue"
import { useUserStore } from "../../../stores/user.js"
const userStore = useUserStore()
// 登录用户的头像
const avatar = computed(() => userStore.userInfo.avatar)
// 点击登出
const handleLogOut = ()=>{ userStore.loginOut()}

</script>
<style></style>
<template>
    <div>
        <div class="l-menubar">
            <!-- 汉堡包 -->
            <Hamburger />
            <!-- 面包屑 -->
            <Breadcrumb />
        </div>
        <div class="r-menubar">
          <!-- 主题色切换组件 -->
          <ThemeSwitch />
          <!-- 头像（下拉菜单） -->
          <DropDown />
            
        </div>
        
    </div>
    
    
</template>
<script setup>
import Hamburger from './Hamburger.vue';
import Breadcrumb from "./Breadcrumb.vue"
import DropDown from "./DropDown.vue"
import ThemeSwitch from './ThemeSwitch.vue';
</script>
<style lang='less' scoped>
.l-menubar {
  display: flex;
  overflow: hidden;
  height: 100%;
  align-items: center;
  & > div {
    margin-right: 16px;
  }
}

.r-menubar {
  display: flex;
  align-items: center;
  & > * {
    margin-left: 20px;
  }
}
</style>
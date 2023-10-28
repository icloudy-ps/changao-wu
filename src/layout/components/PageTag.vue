<template>
    
    <div>
        <el-tag
      v-for="(tag, index) in tagsViewList"
      :key="tag.path"
      class="tags-item"
      :class="{active: $route.path === tag.path}"
      :closable="!($route.path === tag.path)"
      type="info"
      size="small"
      effect="plain"
      @click="handleNavigation(tag.path)"
      @close="handleCloseTag(index)"
    >
      {{ tag.meta.title }}
    </el-tag>
    </div>
</template>
  
<script setup>
  import { computed, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useAppStore } from "../../stores/app";
  const appStore = useAppStore();
const tagsViewList = computed(() => appStore.tagsViewList);

// 当前的路由信息
const route = useRoute()
// 路由实例操作对象
const router = useRouter()

// 侦听当前的路由信息
watch(
  route,
  (newData) => {
    // 当前路由的path、meta.title
    const { path, meta } = newData;
    // console.log({ path, meta });
    // 将当前路由的path、meta传过去进行存储处理
    appStore.addTagsItem({ path, meta });
  },
  { immediate: true }
);

// console.log(tagsViewList);
//点击跳转到指定路由
const handleNavigation = (path) => {
    router.push(path)
}

// 触发关闭标签的事件
const handleCloseTag = (i) => {
    appStore.deleteTagsItem(i)
}
  </script>
  
  <style lang="less" scoped></style>
  
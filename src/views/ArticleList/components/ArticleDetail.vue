<template>
  <div>
    <el-dialog v-model="isDialog">
      <template #header>
        <h3>{{ articleObj.title }}</h3>
      </template>
      <div class="content">
        <el-scrollbar height="300px">
            <div v-html="articleObj.content"></div>
        </el-scrollbar>
      </div>
      <template #footer>{{ formatDate(articleObj.date) }}</template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { formatDate } from "@/utils/formatDate.js";
const isDialog = ref(false); // 控制是否展示/关闭对话框
const props = defineProps(["articleObj"]);
defineExpose({
  openDialog() {
    isDialog.value = true;
  },
});
</script>
<style lang="less" scoped></style>

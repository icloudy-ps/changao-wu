<template>
  <el-dialog v-model="isDialog" >
    <template #header>新建直播</template>
    <el-form :model="liveFormData" :rules="formRules" ref="liveFormRef">
      <el-form-item prop="liveTitle" label="直播标题" label-width="150">
        <el-input
          v-model="liveFormData.liveTitle"
          placeholder="请输入直播标题"
        />
      </el-form-item>
      <el-form-item prop="liveTime" label="直播时间" label-width="150">
        <el-date-picker
          v-model="liveFormData.liveTime"
          type="datetime"
          placeholder="请选择直播时间"
          @change="changeDate"
        />
      </el-form-item>
      <el-form-item prop="liveDuration" label="直播时长" label-width="150">
        <el-input
          v-model.number="liveFormData.liveDuration"
          placeholder="请输入直播时长(分钟)"
        />
      </el-form-item>
      <el-form-item prop="teacher" label="上课老师" label-width="150">
        <el-input v-model="liveFormData.teacher" placeholder="请输入上课老师" />
      </el-form-item>
      <el-form-item label-width="150">
        <el-button @click="isDialog = false">关闭</el-button>
        <el-button type="primary" @click="submitLiveData">创建直播</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, nextTick } from "vue";
import { addLiveItemRequest } from "@/api/live"
const emits = defineEmits(["refresh"]);
const props = defineProps(["classInfoObj"]);
const isDialog = ref(false); // 控制是否展示/关闭对话框
// 表单绑定的数据(要增加的数据, 提交到服务端)
const liveFormData = ref({
  liveTitle: "",
  liveTime: "",
  liveDuration: "",
  teacher: "",
});

// 表单的校验规则
const formRules =  reactive({
    liveTitle: [{required: true, message: "直播标题不能为空", trigger: "blur"}],
    liveTime: [{required: true, message: "直播时间必须选择", trigger: "blur"}],
    liveDuration: [{required: true, message: "直播时长不能为空", trigger: "blur"}],
    teacher: [{required: true, message: "上课老师不能为空", trigger: "blur"}]
})

// 在日期面板上选择日期后
const changeDate = (dateTime) => {
  if(dateTime) liveFormData.value.liveTime = dateTime - 0
}

const liveFormRef = ref() // 表单组件模板引用
const submitLiveData = () => {
  liveFormRef.value.validate(async (valid) => {
    if(valid){
      // 校验通过
      let {className, courseName, refLiveId: {_id}} = props.classInfoObj
      const {data} = await addLiveItemRequest({...liveFormData.value, className, courseName, _id })
      if(data.code === 200){
          liveFormRef.value.resetFields() // 重置表单
          ElMessage.success(data.msg);
          isDialog.value = false // 关闭对话框
          emits("refresh") // 关闭抽屉刷新表格
        } else {
          ElMessage.error(data.msg);
        }
    }else{
      // 校验失败
      ElMessage.error("未通过表单格式校验,请正确填写再创建直播")
    }
  })
}

defineExpose({
  openDialog() {
    isDialog.value = true;
  },
});
</script>

<style lang="less" scoped></style>

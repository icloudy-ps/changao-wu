<template>
    <div class="change-class">
        <el-dialog v-model="isDialogVisible" title="选择班期">
            <el-row :gutter="20">
                <el-col :span="10">{{ courseName }}</el-col>
                <el-col :span="10">
                    <el-select v-model="studentSlassName">
                        <el-option v-for="item in classNameArr" key="item" :value="item"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handelClose">取消</el-button>
                    <el-button type="primary" @click="handleConfirm">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { nextTick, ref } from "vue"
import { updataStudentClassRequest } from "@/api/student"
import { ElMessage } from "element-plus";
const props = defineProps(["phone", "courseName", "className", "classNameArr"])
const isDialogVisible = ref(false)
const studentSlassName = ref("") //班期名称
const emits = defineEmits(["refresh"])


/* 点击确定按钮：将修改的数据提交到服务端，进行数据的更新 */
const handleConfirm = async () => {
    // 提交数据到服务端，进行数据跟新
    const {data} = await updataStudentClassRequest({
        phone:props.phone,
        className:studentSlassName.value,
    })
    if(data.code === 200){
        ElMessage.success(data.msg)
         // 刷新父组件表格
         emits("refresh")
        // 关闭弹框
        handelClose()
       
    }
    console.log(data);
}

// 点击取消按钮，关闭对话框
const handelClose = () => {
    isDialogVisible.value = false
}
// 对外提供isDialogVisible值的方法

defineExpose({
    // 显示对话框
    openDialog() {
        isDialogVisible.value = true
        // 确保props接收到值之后，再去赋值给studentClassName，同步更新到el-select
        nextTick(() => {
            studentSlassName.value = props.className
        })
    }
})
</script>

<style></style>
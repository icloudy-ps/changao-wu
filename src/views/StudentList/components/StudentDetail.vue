<template>
    <div>
        <el-drawer v-model="isDrawer">
            <template #header>
                <h3>学员详细信息</h3>
            </template>
            <div class="content">
                <el-row>
                    <el-col :span="10">
                        <span class="property">手机号： </span>
                        <span class="value">{{ studentInfo.phone }}</span>
                    </el-col>
                    <el-col :span="7">
                        <span class="property">姓名：</span>
                        <span class="value">{{ studentInfo.name }}</span>
                    </el-col>
                    <el-col :span="7">
                        <span class="property">微信</span>
                        <span class="value">{{ studentInfo.wechat }}</span>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="10">
                        <span class="property">年 龄： </span>
                        <span class="value">{{ studentInfo.age }}</span>
                    </el-col>
                    <el-col :span="7">
                        <span class="property">性别：</span>
                        <span class="value">{{ studentInfo.sex }}</span>
                    </el-col>
                    <el-col :span="7">
                        <span class="property">城市</span>
                        <span class="value">{{ studentInfo.city }}</span>
                    </el-col>
                    <el-col :span="10">
                        <span class="property">学历</span>
                        <span class="value">{{ studentInfo.education }}</span>
                    </el-col>
                </el-row>

                <el-button class="primary" @click="showDialog">编辑</el-button>
            </div>
        </el-drawer>
        <el-dialog
      v-model="isDialogVisible"
      title="修改学员信息"
      width="30%"
      destroy-on-close
    >
      <el-form label-position="left" label-width="60">
        <el-form-item label="手机号">
          <el-input v-model="studentInfoFormData.phone" disabled />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="studentInfoFormData.name" />
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="studentInfoFormData.wechat" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input type="number" v-model.number="studentInfoFormData.age" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="studentInfoFormData.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址">
          <el-cascader
            v-model="studentInfoFormData.city"
            :options="cityList"
            placeholder="请选择所在地址"
          />
        </el-form-item>
        <el-form-item label="学历">
          <el-select v-model="studentInfoFormData.education" placeholder="请选择学历">
            <el-option
              v-for="item in educationList"
              :key="item"
              :lable="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateStudentInfo">保存</el-button>
        </span>
      </template>
    </el-dialog>
    </div>
</template>
<script setup>
import { ref } from "vue"
import { updataStudentRequest } from "@/api/student"
import { ElMessage } from "element-plus";
import cityList from "@/utils/city"
import educationList from "@/utils/education"
const prop = defineProps(["studentInfo"])
const emit = defineEmits("refresh")

//是否拉开抽屉
const isDrawer = ref(false)
// 对外暴露控制拉开抽屉的方法
defineExpose({
    openDrawer() {
        isDrawer.value = true
    }
})
// 点击编辑按钮显示对话框
let studentInfoFormData = ref({})     //嵌套在对话框内的表单数据
const isDialogVisible = ref(false)   //控制是否显示对话框
const showDialog = () => {
    isDialogVisible.value = true    //显示对话框
    // 拿到studentInfo数据，解构，切断响应式，避免input控件内数据的变化同步到父组件传来的prop   渲染对话框的表单内
    let { phone,name,wechat,age,sex,city,education } = prop.studentInfo
    city = [...city]

    // 将解构出来的数据付给表单数据量
    studentInfoFormData.value = { phone, name, wechat, age, sex, city, education }

}

/* 修改并保存学员数据后，提交到服务端，更新数据 */
const updateStudentInfo = async () => {
  const { data } = await updataStudentRequest(studentInfoFormData.value);
  if (data.code === 200) {
    ElMessage.success(data.msg);
    // 关闭弹框(销毁)
    isDialogVisible.value = false;
    // 关闭抽屉
    isDrawer.value = false;
    // 刷新父组件的表格数据
    emit("refresh");
  }
};

</script>
<style lang="less">
.content {
    margin-top: 10px;
    line-height: 50px;
    font-size: 14px;
    padding-left: 30px;

    .property {
        color: #999;
        margin-right: 5px;
    }

    .value {
        color: #666;
    }
}
</style>
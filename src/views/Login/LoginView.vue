<template>
  <div class="login-container">
    <!-- 表单组件 -->
    <el-form
      ref="loginFormRef"
      :model="loginFormData"
      :rules="loginFormRules"
      id="login-form"
    >
      <el-form-item prop="username">
        <el-icon :size="14" class="svg-container">
            <i-ep-user-filled/>
        </el-icon>
        <el-input v-model="loginFormData.username" type="text"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-icon :size="14" class="svg-container">
            <i-ep-lock/>
        </el-icon>
        <el-input v-model="loginFormData.password" type="password" show-password/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from 'element-plus'
import { useUserStore } from "../../stores/user"

// 得到store中user的操作对象
const userStore = useUserStore()

// 表单数据源(定义默认数据源)
const loginFormData = reactive({
  username: "丸子",
  password: "wz123456",
});

// 验证表单数据的规则对象
const loginFormRules = reactive({
    // 属性名对应需要定义校验规则的组件的prop
    username: [
      {required: true, message: "账户名不能为空", trigger: "blur"},
      {min: 2, max:6, message: "字符长度在2~6之间", trigger: "blur"},
    ],
    password: [
      {required: true, message: "密码不能为空", trigger: "blur"},
      {min: 2, max:8, message: "密码长度在2~6之间", trigger: "blur"},
    ]

    // 自定义校验函数
    /* password: [{
      validator(rule, value, callback) {
        if(value.length >= 2){
          callback()
        }else{
          callback(new Error("密码不符合规范"))
        }
      }
    }] */
})

// el-form表单组件的模板引用
const loginFormRef = ref()

// 提交表单进行登录请求处理
const submitForm = () => {
  // console.log("submit")

  /**
   * @param {Boolean} valid 表单数据验证是否通过,true表示通过
   * @param {Object} fields 未通过校验的信息对象
   */
  loginFormRef.value.validate((valid, fields) => {
    if(valid){
      // 调用store中处理登录请求的方法, 将表单数据传过去
      userStore.reqLogin(loginFormData)
    }else{
      // 校验
      ElMessage.error("账户密码格式不规范,请正确填写再登录")
    }
  })
}
</script>

<style lang="less">
@formBg: #ffffffd9; // 表单背景色
@borderRadius: 4px; // 圆角弧度
@iconColor: #b1b2b3; // 图标颜色
@textColor: #606266; // 字体颜色

.login-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("@/assets/images/login_bg2.jpg") no-repeat;
  background-size: 100% 100%;
  #login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    padding: 30px;
    border-radius: @borderRadius;
    background-color: @formBg;
    .title {
      text-align: center;
      color: @textColor;
    }
    /* 调整输入框的左边距 */
    .el-input__inner {
      padding-left: 18px;
    }
    .svg-container {
      position: absolute;
      left: 4px;
      z-index: 1;
      size: 14px;
      color: @iconColor;
    }
    // 登录按钮的样式
    .el-button--primary {
      width: 100%;
    }
  }
}
</style>

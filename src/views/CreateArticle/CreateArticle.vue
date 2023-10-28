<template>
    <div>
      <el-card>
        <!-- 表单 -->
        <el-form :model="queryParams" :rules="fromRules" ref="formRef">
          <el-form-item prop="title" label="文章标题">
            <el-input
              v-model="queryParams.title"
              placeholder="请输入文章标题"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="description" label="文章描述">
            <el-input
              v-model="queryParams.description"
              placeholder="请输入文章描述"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="tag" label="文章标签">
            <el-input
              v-model="queryParams.tag"
              placeholder="请定义文章标签"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 富文本编辑器 -->
        <div style="border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            mode="default"
          />
          <Editor
            style="height: 500px; overflow-y: hidden"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            mode="default"
            @onCreated="handleCreated"
          />
        </div>
        <!-- 提交按钮 -->
        <el-button type="primary" @click="submitArticleData">创建文章</el-button>
      </el-card>
    </div>
  </template>
  <script setup>
  import "@wangeditor/editor/dist/css/style.css"; // 引入 css
  import { onBeforeUnmount, ref, shallowRef, reactive } from "vue";
  import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
  import { addArticleRequest } from "@/api/article";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  // 表单绑定的数据
  const queryParams = ref({
    title: "",
    description: "",
    content: "",
    tag: "",
  });
  
  const fromRules = reactive({
    title: [{ required: true, message: "文章标题不能为空", trigger: "blur" }],
    description: [
      { required: true, message: "文章描述不能为空", trigger: "blur" },
    ],
    tag: [{ required: true, message: "文章标签不能为空", trigger: "blur" }],
  });
  
  const editorRef = shallowRef(); // 编辑器实例，必须用 shallowRef
  const valueHtml = ref(""); // 编辑器绑定的内容(HTML)
  
  // 工具栏和编辑器的配置对象
  const toolbarConfig = {};
  const editorConfig = {
    placeholder: "请输入文章内容...",
    MENU_CONF: {
      // 上传图片的方式
      uploadImage: {  
        server: '/api/uploadImg',
        // form-data fieldName ，默认值 'wangeditor-uploaded-image'
        fieldName: "article-img",
        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 10,
        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ["image/*"],
        // 超时时间，默认为 10 秒
        timeout: 5 * 1000, // 5 秒
        base64LimitSize: 5 * 1024, //  5 * 1024 为 5kb
      },
    },
  };
  
  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });
  //  设置编辑器的实例对象
  const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };
  
  const formRef = ref();
  // 创建文章: 提交数据到服务端
  const submitArticleData = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        if (!valueHtml.value) return ElMessage.error("文章内容不允许为空");
        queryParams.value.content = valueHtml.value; // 将文章内容赋值
        const { data } = await addArticleRequest(queryParams.value);
        if (data.code === 200) {
          formRef.value.resetFields(); // 重置表单
          ElMessage.success(data.msg);
          valueHtml.value = ""; // 清空编辑器内容
          router.push("/article/list"); // 跳转到文章列表路由
        } else {
          ElMessage.error(data.msg);
        }
      } else {
        ElMessage.error("校验未通过");
      }
    });
  };
  </script>
  <style lang="less" scoped></style>
  
  <!-- 
      1. 在线编辑文章内容(创建)
      2. 上传写好的文档文件  .md。 里面引入的图片是网络地址，不建议用本地路径
          图床
   -->
  
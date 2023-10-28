<template>
    <div class="import-student-container">
      <el-card>
        <!-- 导入的操作说明 -->
        <div class="import-instruction">
          <el-collapse v-model="isCollapse">
            <el-collapse-item name="1">
              <template #title>
                <span class="title">导入说明</span>
              </template>
              <ul class="content">
                <li>1.导入前请先下载相应的模板，严格按照模板规则进行数据输入</li>
                <li>2.只支持excel文件, 文件大小要求在2M以内</li>
                <li>3.在本页面导入学员，学员会进入学员管理模块</li>
                <li><el-button @click="handleDownload">下载模板</el-button></li>
              </ul>
            </el-collapse-item>
          </el-collapse>
        </div>
        <!-- 上传文件的控件 -->
        <div class="import-excel">
          <el-upload
            ref="uploadRef"
            class="upload-demo"
            action="/api/import/studentTable"
            :auto-upload="false"
            accept=".xlsx, .xls"
            :with-credentials="true"
            :headers="headersObj"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="getImportResultList"
          >
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
            <el-button type="success" @click="submitUpload">确定导入</el-button>
            <template #tip>
              <div class="el-upload__tip">只允许上传1个文件</div>
            </template>
          </el-upload>
        </div>
  
        <!-- 表格展示所有的导入记录 -->
        <el-table
          class="import-result-table"
          v-loading="loading"
          :data="importResultList"
          style="width: 100%"
          max-height="600"
        >
          <el-table-column prop="fileName" label="导入的文件" width="200" />
          <el-table-column label="导入时间" width="200">
            <template #default="{ row }">
              {{ formatDate(row.time) }}
            </template>
          </el-table-column>
          <el-table-column prop="importPeople" label="操作者" width="200" />
          <el-table-column
            prop="statusDescription"
            label="导入状态"
            width="200"
          />
          <el-table-column prop="total" label="导入总条数" width="200" />
          <el-table-column prop="successCount" label="成功条数" width="200" />
          <el-table-column prop="defeatCount" label="失败条数" width="200" />
          <el-table-column
            prop="importStudentError"
            label="查看失败详情"
            width="200"
          >
            <template #default="{ row }">
              <el-button
                type="danger"
                v-if="row.importStudentError.length"
                @click="handleResultDetail(row.importStudentError)"
              >
                详情
              </el-button>
              <span v-else>无</span>
            </template>
          </el-table-column>
        </el-table>
  
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          @size-change="getImportResultList"
          @current-change="getImportResultList"
          :page-sizes="[10, 20, 30, 40]"
          prev-text="上一页"
          next-text="下一页"
          layout="total, sizes, prev, pager, next, jumper"
          :total="importResultTotal"
        />
      </el-card>
  
      <!-- 查看详情的对话框 -->
      <el-dialog v-model="isDialogVisible" title="失败详情" width="420">
        <el-table :data="errDetailArr" style="width: 100%" max-height="250">
          <el-table-column prop="phone" label="手机号" width="200" />
          <el-table-column prop="reason" label="失败原因" width="200" />
        </el-table>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isDialogVisible = false">关闭</el-button>
          </span>
        </template>
      </el-dialog>
      <ErrorDetail/>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useUserStore } from "@/stores/user";
  import { formatDate } from "@/utils/formatDate.js";
  import { genFileId } from "element-plus";
  import { downloadTemplateRequest, importResultListRequest } from "@/api/import";
  import ErrorDetail from "./components/ErrorDetail.vue"
  const isCollapse = ref("1");
  const uploadRef = ref(); // upload组件的模板引用
  
  // 点击下载模板.xslx文件
  const handleDownload = async () => {
    const { data } = await downloadTemplateRequest();
    // 解析blob对象, 得到能访问文件的地址(blob)
    const downloadUrl = URL.createObjectURL(data);
    // 借助a标签的download属性实现点击按钮下载模板文件到本地
    const eleA = document.createElement("a");
    eleA.href = downloadUrl;
    eleA.download = "模板.xlsx";
    // 调用a的点击处理
    eleA.click();
  };
  
  // 当选择文件的数量超出限制1时, 设置新文件替换旧文件
  const handleExceed = (files) => {
    uploadRef.value.clearFiles(); // 清空文件列表
    // files[0].uid = genFileId()
    uploadRef.value.handleStart(files[0]); // 新的文件替换旧的文件（手动选择）
  };
  
  // 点击确定导入按钮: 提交文件到服务端
  const userStore = useUserStore();
  const headersObj = ref({ Authorization: userStore.token });
  const submitUpload = () => {
    // 调用内置的请求方法提交文件
    uploadRef.value.submit();
  };
  
  /* 处理渲染所有导入记录的表格 */
  const loading = ref(false);
  const importResultList = ref([]); // 所有导入记录的数组
  const queryParams = ref({
    pageNum: 1,
    pageSize: 10,
  });
  const importResultTotal = ref(0); // 总记录条数
  // 获取所有导入记录的数据列表
  const getImportResultList = async () => {
    const { data } = await importResultListRequest(queryParams.value);
    if (data.code === 200) {
      importResultTotal.value = data.total;
      importResultList.value = data.data;
    }
  };
  getImportResultList();
  
  /* 查看失败详情 */
  const isDialogVisible = ref(false); // 控制对话框是否显示
  const errDetailArr = ref([]); // 错误详情数组
  const handleResultDetail = (arr) => {
    isDialogVisible.value = true;
    errDetailArr.value = arr;
    // console.log(`手机号为: ${item.phone}的数据, 导入失败的原因是: ${item.reason}`);
  };
  </script>
  
  <style lang="less" scoped>
  .import-instruction {
    padding-left: 20px;
    border: 1px solid #eee;
    box-sizing: border-box;
    font-size: 13px;
    .el-collapse {
      border: none;
    }
    /deep/ .el-collapse-item__arrow {
      margin-left: 0;
    }
    .content {
      line-height: 2.2em;
    }
  }
  
  .import-excel {
    margin: 10px 0;
    button{
      margin-right: 10px;
    }
  }
  
  .import-result-table {
    margin-top: 20px;
    margin-bottom: 10px;
    /deep/ .el-table__header .cell {
      font-weight: bold;
      color: #000;
    }
  }
  </style>
  
<template>
    <div>
      <el-card>
        <!-- 筛选条件 -->
        <el-row>
          <el-select
            v-model="queryParams.tag"
            clearable
            placeholder="筛选标签"
            @change="getArticleList"
          >
            <el-option v-for="item in tagListArr" :key="item" :value="item" />
          </el-select>
        </el-row>
        <!-- 表格展示数据 -->
        <el-table :data="articleListArr" max-height="600" class="class-table">
          <el-table-column label="文章标题" prop="title" />
          <el-table-column label="文章描述" prop="description" />
          <el-table-column label="文章标签" prop="tag" />
          <el-table-column label="作者" prop="author" />
          <el-table-column label="内容">
            <template #default="{ row }">
              <span :title="row.content">{{
                textOverfllowEllipsis(row.content, 10)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template #default="{ row }">
              {{ formatDate(row.date) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300" align="center" fixed="right">
            <template #default="{ row }">
              <el-button @click="deleteArticle(row)">删除文章</el-button>
              <el-button @click="lookArticle(row)">查看文章</el-button>
            </template>
          </el-table-column>
        </el-table>
  
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="queryParams.pageCode"
          v-model:page-size="queryParams.pageSize"
          @size-change="getArticleList"
          @current-change="getArticleList"
          :page-sizes="[10, 20, 30, 40]"
          prev-text="上一页"
          next-text="下一页"
          layout="total, sizes, prev, pager, next, jumper"
          :total="articleTotal"
        />
      </el-card>
      <ArticleDetail ref="articleDetailRef" :articleObj="articleObj" />
    </div>
  </template>
  <script setup>
  import { ref, onActivated } from "vue";
  import { getArticleListRequest, deleteArticleRequest } from "@/api/article";
  import { formatDate } from "@/utils/formatDate.js";
  import { textOverfllowEllipsis } from "@/utils/formatEllipsis.js";
  import ArticleDetail from "./components/ArticleDetail.vue";
  import { quitORconfirm } from "@/hooks/getQuitORConfirm";
  const queryParams = ref({
    pageCode: 1,
    pageSize: 10,
    tag: "",
  });
  
  // 当从keep-alive中需要切换到当前组件时, 组件插入到DOM中会触发的钩子
  onActivated(() => {
    // 刷新表格 /
    getArticleList();
  });
  
  const articleListArr = ref([]);
  const articleTotal = ref(0);
  const tagListArr = ref([]);
  // 请求数据渲染表格
  const getArticleList = async () => {
    const { data } = await getArticleListRequest(queryParams.value);
    if (data.code === 200) {
      articleListArr.value = data.data;
      articleTotal.value = data.total;
      tagListArr.value = data.tagList; // 标签数组
    }
  };
  
  // 删除文章
  const deleteArticle = (row) => {
    quitORconfirm(
      async () => {
        const { data } = await deleteArticleRequest({ _id: row._id });
        if (data.code === 200) {
          ElMessage.success(data.msg);
          getArticleList();
        } else {
          ElMessage.error(data.msg);
        }
      },
      /* () => {
        ElMessage.info("取消了删除操作");
      } */
    );
  };
  
  const articleDetailRef = ref(); // 组件模板引用
  const articleObj = ref(); // 当前行文章数据
  // 查看文章内容
  const lookArticle = (row) => {
    articleObj.value = row;
    articleDetailRef.value.openDialog();
  };
  </script>
  <style lang="less" scoped></style>
  
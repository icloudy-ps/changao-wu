<template>
  <div>
    <el-card>
      <!-- 筛选条件 -->
      <el-row>
        <el-col :span="4">
          <el-select
            v-model="queryParams.kindName"
            clearable
            @change="getCourseData"
            placeholder="请选择类别"
          >
            <el-option v-for="item in kindNameList" :key="item" :value="item" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <!-- 简单模糊查询 -->
          <el-input
            v-model="queryParams.courseName"
            placeholder="请输入课程名称"
            clearable
            @change="getCourseData"
          />
        </el-col>
      </el-row>
      <!-- 展示数据的表格 -->
      <el-table
        v-loading="loading"
        :data="courseList"
        style="width: 100%"
        max-height="600"
        class="course-table"
      >
        <el-table-column prop="kindName" label="类别" width="150" />
        <el-table-column prop="courseName" label="课程名" width="200" />
        <el-table-column prop="sellingPrice" label="售价" width="200" />
        <el-table-column label="是否在售" width="200">
          <template #default="{ row }">
            <el-switch
              v-model="row.isSale"
              inline-prompt
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              "
              active-text="在售"
              inactive-text="下架"
              disabled
            />
          </template>
        </el-table-column>
        <el-table-column prop="updatePeople" label="更新人" width="200" />
        <el-table-column label="更新时间" width="200">
          <template #default="{ row }">{{
            formatDate(row.updateTime)
          }}</template>
        </el-table-column>
        <el-table-column prop="description" label="课程描述" width="200" />
        <el-table-column label="课程封面" width="200">
          <template #default="{ row }">
            <el-image
              style="width: 100px; height: 100px"
              :src="row.coverImage"
              fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <el-button @click="editCourseInfo(row)">编辑课程</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        @size-change="getCourseData"
        @current-change="getCourseData"
        :page-sizes="[10, 20, 30, 40]"
        prev-text="上一页"
        next-text="下一页"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </el-card>
    <!-- 编辑课程组件 -->
    <EditCourse ref="editCourseRef" :rowCourseInfo="rowCourseInfo" @refresh="getCourseData"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { formatDate } from "@/utils/formatDate";
import { courseListRequest } from "@/api/course";
import EditCourse from "./components/EditCourse.vue"
const queryParams = ref({
  /* 课程列表的请求参数 */
  kindName: "", // 分类
  courseName: "", // 阶段名
  pageNum: 1, // 页码
  pageSize: 10, // 每页条数
});

/* 请求获取课程数据列表 */
const courseList = ref([]); // 课程数据数组
const loading = ref(false); // 控制加载框
const total = ref(0); // 分页器显示的总条数
const kindNameList = ref([]); // 类别数组
const getCourseData = async () => {
  loading.value = true;
  const { data } = await courseListRequest(queryParams.value);
  if (data.code === 200) {
    courseList.value = data.data;
    total.value = data.total;
    kindNameList.value = data.kindNameList;
    // console.log("data", data.data);
  }

  setTimeout(() => {
    loading.value = false;
  }, 500);
};
getCourseData()


/* 点击编辑课程的按钮 */
const editCourseRef = ref() //EditCourse组件的模板引用
const rowCourseInfo = ref({}) // 当前这行的课程信息数据
const editCourseInfo = (row) => {
    rowCourseInfo.value = row 
    editCourseRef.value.openDrawer() // 拉开抽屉
}
</script>

<style lang="less" scoped>
.course-table {
  margin: 10px 0;
}
</style>

<template>
  <div>
    <el-card>
      <!-- 筛选表格内要渲染的数据的条件---下拉菜单 -->
      <div class="filter-contaier">
        <el-select v-model="queryParams.kindName" class="filter-select" placeholder="请筛选类别"
          @change="changeKindName(queryParams.kindName)">
          <el-option v-for="item in filterConditionArr" :key="item.value" :value="item.value" />
        </el-select>

        <el-select v-model="queryParams.courseName" class="filter-select" placeholder="请在当前类别下筛选阶段名"
          @change="changeClassName(queryParams.courseName)">
          <el-option v-for="item in courseNameArr" :key="item.value" :value="item.value" />
        </el-select>

        <el-select v-model="queryParams.className" class="filter-select" placeholder="请在当前阶段下筛选班期">
          <el-option v-for="item in classNameArr" :key="item" :value="item" />
        </el-select>

        <el-button type="primary" @click="getStudentList">查询</el-button>
        <el-button type="info" @click="resetSelect">重置</el-button>
      </div>
      <!-- 展示数据的表格 -->
      <el-table v-loading="loading" :data="studentList" style="width: 100%" max-height="600">
        <el-table-column prop="phone" label="手机号" width="180" />
        <el-table-column prop="kindName" label="类别" width="180" />
        <el-table-column prop="courseName" label="课程阶段名" width="180" />
        <el-table-column prop="className" label="班期名" width="250" />
        <el-table-column prop="origin" label="来源" width="180" />
        <el-table-column prop="updatePeople" label="更新人" width="180" />
        <el-table-column label="更新时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.updateTime) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <!-- row: 当前行的数据。  等同遍历studentList数组得到的当前项成员数据 -->
          <template #default="{ row }">
            <el-button @click="openStudentInfoDrawer(row.detailInfo)">学员详情</el-button>
            <el-button @click="changeClass(row)">修改班期</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination v-model:current-page="queryParams.pageNum" v-model:page-size="queryParams.pageSize"
        @size-change="getStudentList" @current-change="getStudentList" :page-sizes="[10, 20, 30, 40]" prev-text="上一页"
        next-text="下一页" layout="total, sizes, prev, pager, next, jumper" :total="studentDataTotal" />
    </el-card>
    <!-- 右侧抽屉 -->
    <StudentDetail :studentInfo="studentInfo" ref="studentDetailRef" @refresh="getStudentList" />

    <!-- 修改班期的对话框组件 -->
    <StudentClass v-bind="studentClassObj" ref="studentClassRef" @refresh="getStudentList" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import {
  studentListRequest,
  conditionClassificationRequest,
} from "@/api/student";
import { formatDate } from "@/utils/formatDate.js";
import StudentDetail from "./components/StudentDetail.vue";
import StudentClass from "./components/StudentClass.vue";

const loading = ref(false); // 加载动画
const studentDataTotal = ref(0); // 数据总条数
const studentList = ref([]); // 学员列表数据数组
const queryParams = ref({
  /* 学员列表的请求参数 */
  kindName: "", // 分类
  courseName: "", // 阶段名
  className: "", // 班期名
  pageNum: 1, // 页码
  pageSize: 10, // 每页条数
});

/* 筛选表格中的数据 */
// const kindNameArr = ["web", "Python", "java"]
const filterConditionArr = ref([]);
const getCondition = async () => {
  // 获取筛选条件的数据
  const { data } = await conditionClassificationRequest()
  filterConditionArr.value = data

};
getCondition()

// 在下拉选框中修改类别时会触发
const courseNameArr = ref([]) // 当前类别下的阶段名数组
const changeKindName = (kindName) => {
  // 获取该类别下的阶段名数组
  courseNameArr.value = filterConditionArr.value.find(item => item.value === kindName).courseName
  // 当修改类别后, 清空阶段名对应的下拉选框的值

  queryParams.value.courseName = ""
  queryParams.value.className = ""

}


//在下拉选框中修改阶段名的值时会触发
const classNameArr = ref([])
const changeClassName = (courseName) => {
  classNameArr.value = courseNameArr.value.find(item => item.value === courseName).className
  // 当修改阶段后，清空班期名对应的下拉选框的值
  console.log(classNameArr.value);
  queryParams.value.className = ""

}

/* 请求拿到学员列表数据 */
const getStudentList = async () => {
  loading.value = true; // 开启加载动画
  const { data } = await studentListRequest(queryParams.value);
  studentList.value = data.data;
  studentDataTotal.value = data.total;
  // loading.value = false // 关闭加载动画

  setTimeout(() => {
    loading.value = false;
  }, 500);
};
getStudentList();

// 重置下拉列表
const resetSelect = () => {
  // 清空下拉列表值
  queryParams.value.kindName = ""
  queryParams.value.courseName = ""
  queryParams.value.className = ""
  courseNameArr.value = []

  courseNameArr.value = []

}

/* 查看学员详情（打开抽屉） */
const studentInfo = ref({}); /// 学员详情信息
const studentDetailRef = ref(); // 学员详情组件的模板引用ref
const openStudentInfoDrawer = (data) => {
  studentInfo.value = data; // 将学员信息传递到组件
  studentDetailRef.value.openDrawer(); // 拉开抽屉组件

};

const studentClassRef = ref()  //学员班期组件ref
/* 修改学员的班期信息:显示对话框（子组件） */
const studentClassObj = ref({})   // 学员班期组件需要接收的数据
const changeClass = (data) => {
  // 发起请求
  const { phone, kindName, courseName, className } = data
  // 改学员的阶段名下可供选择的班期名数组
  const classNameArr = filterConditionArr.value.find(item => item.value === kindName)?.courseName.find(item => item.value === courseName)?.className
  // 将班期组件需要的数据传过去
  studentClassObj.value = { phone, courseName, className, classNameArr }
  // 显示对话框
  studentClassRef.value.openDialog()
};
</script>
<style lang="less" scoped>
.filter-contaier {
  margin-bottom: 20px;
}

.filter-select {
  margin-right: 20px;

}
</style>
  
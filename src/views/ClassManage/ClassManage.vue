<template>
  <div>
    <el-card>
      <!-- 筛选条件 -->
      <el-row>
        <el-col :span="6">
          <el-date-picker
            v-model="queryParams.enrollTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
          />
        </el-col>
        <el-col :span="6">
          <!-- 简单模糊查询 -->
          <el-input
            v-model="queryParams.className"
            placeholder="请输入班期名称"
            clearable
            @change="getClassListData"
          />
        </el-col>
      </el-row>
      <!-- 表格展示数据 -->
      <el-table :data="classList" max-height="600" class="class-table" v-loading="loading">
        <el-table-column align="center" label="招生时间">
          <template #default="{ row }">
            {{ formatDate(row.enrollTime[0]) }}
            <p>至</p>
            {{ formatDate(row.enrollTime[1]) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="班期名称"
          prop="className"
        ></el-table-column>
        <el-table-column
          align="center"
          label="学员数量"
          prop="studentNum"
        ></el-table-column>
        <el-table-column
          align="center"
          label="更新人"
          prop="updatePeople"
        ></el-table-column>
        <el-table-column align="center" label="更新时间">
          <template #default="{ row }">
            {{ formatDate(row.updateTime) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="{ row }">
            <el-button @click="openDrawer(row)">内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="queryParams.pageCode"
        v-model:page-size="queryParams.pageSize"
        @size-change="getClassListData"
        @current-change="getClassListData"
        :page-sizes="[10, 20, 30, 40]"
        prev-text="上一页"
        next-text="下一页"
        layout="total, sizes, prev, pager, next, jumper"
        :total="classDataTotal"
      />
    </el-card>
    <!-- 查看直播内容的抽屉效果组件 -->
    <LiveManage @refresh="getClassListData" ref="liveManageRef" :rowClassInfo="rowClassInfo"/>
  </div>
</template>
<script setup>
import { classListRequest } from "@/api/class";
import { formatDate } from "@/utils/formatDate.js";
import { ref } from "vue";
import LiveManage from "./components/LiveManage.vue"
const loading = ref(false)
const queryParams = ref({
  enrollTime: [], // 招生时间范围
  courseName: "", // 阶段名
  className: "", // 班期名
  pageCode: 1, // 页码
  pageSize: 10, // 每页条数
});

const classList = ref([]); // 班期列表数组
const classDataTotal = ref(0); // 总条数

/* 请求班期数据 */
const getClassListData = async () => {
  loading.value = true
  const { data } = await classListRequest(queryParams.value);
  if (data.code === 200) {
    classList.value = data.data;
    classDataTotal.value = data.total;
  }
  setTimeout(() => {
    loading.value = false
  }, 500);
};
getClassListData();

/* 在日期面板上选择日期后 */
const changeDate = (dateArr) => {
  if(dateArr){
    // 将日期转为毫秒数
    dateArr[0] = dateArr[0] - 0
    dateArr[1] = dateArr[1] - 0
  }
  getClassListData()
}

/* 显示抽屉(内容管理) */
const rowClassInfo = ref({}) // 当前行的数据
const liveManageRef = ref() // liveManage组件模板
const openDrawer = (row) => {
  rowClassInfo.value = row
  liveManageRef.value.openDrawer()
}

</script>

<style lang="less" scoped>
.class-table {
  margin: 10px 0;
}
</style>

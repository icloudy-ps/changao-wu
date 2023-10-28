<template>
  <div>
    <el-drawer v-model="isDrawer" size="50%">
      <template #header>
        <h4>内容管理</h4>
      </template>
      <div class="class-info">
        <h5>{{ rowClassInfo.courseName }}</h5>
        <p><span>班期名称:</span> {{ rowClassInfo.className }}</p>
        <el-button type="primary" @click="openDialog">新增直播</el-button>
      </div>
      <div class="live-list">
        <ul>
          <li
            v-for="item in liveInfoObj.liveList"
            :key="item._id"
            class="live-item"
          >
            <p class="tag">回放</p>
            <div class="live-content">
              <p class="live-title">{{ item.liveTitle }}</p>
              <div>
                <span>上课老师: {{ item.teacher }}</span>
                <span>直播时间: {{ formatDate(item.liveTime) }}</span>
                <span>直播时长: 02:00:00</span>
              </div>
            </div>
            <div class="delete">
              <SvgIcon iconFileName="Delete" @click="deleteLiveItem(item)" />
            </div>
          </li>
        </ul>
      </div>
    </el-drawer>

    <AddLive
      @refresh="getClassListData"
      ref="addLiveDialogRef"
      :classInfoObj="rowClassInfo"
    />
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import SvgIcon from "@/components/Svg-Icon/SvgIcon.vue";
import { formatDate } from "@/utils/formatDate.js";
import { deleteLiveItemRequest } from "@/api/live";
import AddLive from "./AddLive.vue";
import { quitORconfirm } from "@/hooks/getQuitORConfirm";

const isDrawer = ref(false); // 控制是否展示/隐藏抽屉
const emits = defineEmits(["refresh"]);
const prop = defineProps(["rowClassInfo"]);

const liveInfoObj = ref({}); // 直播数据对象

// 删除该节直播
const deleteLiveItem = (liveItem) => {
  // 定义删除的提示框
  quitORconfirm(
    async () => {
      const { data } = await deleteLiveItemRequest({
        liveDataId: liveInfoObj.value._id, // 直播数据id
        liveItemId: liveItem._id, // 直播列表成员项的id
      });
      if (data.code === 200) {
        ElMessage.success(data.msg);
        isDrawer.value = false;
        emits("refresh");
      } else {
        ElMessage.error(data.msg);
      }
    },
    /* () => {
      ElMessage.info("取消了删除操作");
    } */
  );
};

/* 显示新增直播的对话框 */
const addLiveDialogRef = ref(); // AddLive组件的模板引用
const openDialog = () => {
  addLiveDialogRef.value.openDialog();
};

/* 子组件调用: 刷新父组件的表格和关闭抽屉 */
const getClassListData = () => {
  isDrawer.value = false;
  emits("refresh");
};

/* 对外暴露控制拉开抽屉的方法 */
defineExpose({
  openDrawer() {
    isDrawer.value = true;
    nextTick(() => {
      liveInfoObj.value = prop.rowClassInfo.refLiveId;
    });
  },
});
</script>

<style lang="less" scoped>
/deep/ .el-drawer__body {
  padding-top: 0;
}
.class-info {
  position: absolute;
  box-sizing: border-box;
  width: 92%;
  top: 70px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  background-color: #fff;
  z-index: 100;
  h5 {
    font-size: 15px;
    color: #000;
  }
  p {
    font-size: 13px;
    color: #666;
    margin-top: 20px;
    margin-bottom: 20px;
    span {
      color: #ccc;
    }
  }
}

.live-list {
  margin-top: 130px;
  .live-item {
    position: relative;
    padding: 25px 60px;
    &:hover {
      .delete {
        display: block;
      }
    }
    .live-content {
      h5 {
        font-size: 14px;
      }
      div {
        margin-top: 15px;
        font-size: 12px;
        color: #bfbfbf;
        span {
          margin-right: 50px;
        }
      }
    }
    .tag {
      position: absolute;
      left: 12px;
      top: 25px;
      width: 38px;
      height: 20px;
      border: 1px solid #eee;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      background-color: #fafafa;
      border-radius: 5px;
    }
    .delete {
      display: none;
      position: absolute;
      left: 50%;
      top: 26px;
      margin-left: 200px;
      width: 20px;
      height: 20px;
      color: #e37777 !important;
      cursor: pointer;
      font-size: 15px !important;
    }
  }
}
</style>

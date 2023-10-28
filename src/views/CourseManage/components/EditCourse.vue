<template>
  <div class="edit-course">
    <el-drawer v-model="isDrawer" size="50%">
      <template #header>
        <h4>编辑课程信息</h4>
      </template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="修改课程基础信息" name="info">
          <el-form :model="courseInfo">
            <el-form-item prop="kindName" label="类别:" label-width="100">
              <el-input v-model="courseInfo.kindName" disabled></el-input>
            </el-form-item>
            <el-form-item prop="courseName" label="课程名:" label-width="100">
              <el-input v-model="courseInfo.courseName" disabled></el-input>
            </el-form-item>
            <el-form-item prop="sellingPrice" label="售价:" label-width="100">
              <el-input v-model.number="courseInfo.sellingPrice"></el-input>
            </el-form-item>
            <el-form-item prop="isSale" label="是否在售:" label-width="100">
              <el-switch
                v-model="courseInfo.isSale"
                inline-prompt
                style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                "
                active-text="在售"
                inactive-text="下架"
              />
            </el-form-item>
            <el-form-item
              prop="description"
              label="课程简介:"
              label-width="100"
            >
              <el-input v-model.trim="courseInfo.description"></el-input>
            </el-form-item>
            <el-form-item label-width="100">
              <el-button @click="isDrawer = false">关闭</el-button>
              <el-button type="primary" @click="submitCourseBaseInfo"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改课程封面" name="cover">
          <el-row>
            <el-col :span="3">课程原封面:</el-col>
            <el-col :span="8">
              <el-image
                class="cover-image"
                :src="courseInfo.coverImage"
                :preview-src-list="[courseInfo.coverImage]"
                :initial-index="0"
                :hide-on-click-modal="true"
                fit="cover"
              />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">更换封面:</el-col>
            <el-col :span="8">
              <el-upload
                action="/api/course/reviseCourseCover"
                class="cover-upload"
                ref="uploadCoverRef"
                list-type="picture-card"
                :auto-upload="false"
                :limit="1"
                :on-exceed="handleExceed"
                accept=".png, .jpg, .webp"
                :headers="headersObj"
                :data="{_id: courseInfo._id}"
                :on-success="successUploadCover"
              >
                <SvgIcon iconFileName="Plus" class="uploader-icon" :size="28" />
                <template #tip>
                  <p class="tip">课程封面允许上传的文件类型为png/jpg/webp</p>
                </template>
              </el-upload>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3"></el-col>
            <el-col :span="8">
              <el-button @click="isDrawer = false">关闭</el-button>
              <el-button type="primary" @click="submitCourseCover">保存</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { reviseCourseInfoRequest } from "@/api/course";
import SvgIcon from "@/components/Svg-icon/SvgIcon.vue";
import { useUserStore } from "@/stores/user";
const prop = defineProps(["rowCourseInfo"]);
const emits = defineEmits(["refresh"]);
const isDrawer = ref(false); // 控制是否展示/隐藏抽屉
const activeName = ref("info"); // tabs选项卡的展示项
const courseInfo = ref({}); // 当前组件接收到的该课程信息
const uploadCoverRef = ref(); // 上传组件模板引用

// 提交课程的修改后的基本信息到服务端
const submitCourseBaseInfo = async () => {
  const { data } = await reviseCourseInfoRequest(courseInfo.value);
  if (data.code === 200) {
    ElMessage.success(data.msg);
    isDrawer.value = false;
    emits("refresh");
  }
};

// 当选择文件的数量超出限制1时, 设置新文件替换旧文件
const handleExceed = (files) => {
  uploadCoverRef.value.clearFiles(); // 清空文件列表
  uploadCoverRef.value.handleStart(files[0]); // 新的文件替换旧的文件（手动选择）
};

// 提交更换的课程封面图片
const userStore = useUserStore();
const headersObj = ref({ Authorization: userStore.token });
const submitCourseCover = async () => {
  // 调用组件自身提供的submit提交
  uploadCoverRef.value.submit()
}

/* 成功上传封面会触发的钩子 */
const successUploadCover = (res) => {
  if(res?.code === 200){
    ElMessage.success(res.msg);
    isDrawer.value = false;
    emits("refresh");
  }
}

/* 对外暴露控制拉开抽屉的方法 */
defineExpose({
  openDrawer() {
    isDrawer.value = true;
    nextTick(() => {
      let {
        _id,
        kindName,
        courseName,
        sellingPrice,
        isSale,
        description,
        coverImage,
      } = prop.rowCourseInfo;
      courseInfo.value = {
        _id,
        kindName,
        courseName,
        sellingPrice,
        isSale,
        description,
        coverImage,
      };
    });
  },
});
</script>

<style lang="less" scoped>
.cover-image {
  width: 140px;
  height: 140px;
  border-radius: 6px;
  overflow: hidden;
}
/deep/ .cover-upload {
  .el-upload-list.el-upload-list--picture-card > * {
    width: 140px;
    height: 140px;
  }
  .tip {
    font-size: 12px;
    color: #f00;
  }
}
</style>

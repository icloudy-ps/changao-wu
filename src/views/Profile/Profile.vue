<template>
  <div >
    <div class="introduction-container">
      <h3>项目介绍</h3>
      <p>
        基于vue3+vite+vueRouter-Pinia实现的后台前端综合解决方案, 免费开源。
        前端后台代码封装过后十分精简易上手，出错概率低。同时会陆续更新一些实用功能。
      </p>
      <p class="link-group">
        <a class="primary" href="https://github.com/" target="_blanks">Github</a>
        <a href="https://gitee.com/" target="_blanks">Gitee</a>
      </p>
    </div>

    <el-row :gutter="20">
      <el-col :span="10">
        <el-tabs v-model="projectTabsActiveName" class="project-tabs">
          <el-tab-pane label="项目功能" name="feature">
            <el-collapse accordion>
              <el-collapse-item v-for="item in featureData" :key="item.id" :title="item.title" :name="item.id">
                <div v-html="item.content"></div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="更新日志" name="version">
            <el-collapse accordion>
              <el-collapse-item v-for="item in versionData" :key="item.id" :title="item.title" :name="item.id">
                <ul>
                  <li v-for="cItem in item.content" :key="cItem">
                    {{ cItem }}</li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="14">

        <!-- 作者 -->

        <div class="autho">
          <h3>
            <SvgIcon iconFileName="Male" color="#1aa094" />关于开发者
          </h3>
          <p>
            40年前进入程序猿领域,钻研技术,现已精通 :
            高级计算机的开机与关机,传统办公软件excel甚至word等高端软件的安装与卸载,在各大主流后端语言如python,java中输出hello
            world,意外发现前端,从此爱上了,并学废了前端至高要义,ctrl-a ctrl-v
            编程手法, 未来还将研究更多与前端有关的高端技术! 活到老 学到老!
          </p>
        </div>

        <div class="contact card">
          <h3 class="title">
            <SvgIcon iconFileName="Service" color="#4894f0" /> 联系方式
          </h3>
          <p>
            <SvgIcon iconFileName="Link" />官网:https://edu.zztion.com/shop/index
          </p>
          <p>
            <SvgIcon iconFileName="UserFilled" />QQ:3342483749
          </p>
          <p>
            <SvgIcon iconFileName="ChatDotRound" />微信: 18285873023
          </p>
          <p>
            <SvgIcon iconFileName="PhoneFilled" />手机号: 18285873023
          </p>
        </div>
        <div class="promotion card">
          <h3 class="title">
            <SvgIcon iconFileName="Money" color="#ff5722" /> 打赏
          </h3>
          <p>觉得网站好用可以鼓励一下</p>
          <img src="@/assets/images/pay_code.png" alt="收款二维码" class="pay" />
        </div>
        <!-- 联系方式 -->

        <!-- 推广(氪金的广告) -->
      </el-col>
    </el-row>
  </div>
</template>
  
<script setup>
import { computed, ref } from "vue";
import SvgIcon from "../../components/Svg-icon/SvgIcon.vue";
import {
  projectFeatureRequest,
  projectVersionRequest,
} from "@/api/projectData";

// 项目介绍相关的选项卡展示项名称
const projectTabsActiveName = ref("feature");

// 项目功能列表数据
const featureData = ref([]);
projectFeatureRequest()
  .then(({ data }) => {
    featureData.value = data;
  })
  .catch((err) => { });

// 项目版本更新列表数据
const versionData = ref([]);
projectVersionRequest()
  .then(({ data }) => {
    versionData.value = data;
    // console.log(data);
  })
  .catch((err) => { });
</script>
  
<style lang="less" scoped>
.promotion{
  height: 500px;
  overflow: scroll;
}
.introduction-container {
  margin-bottom: 10px;
  padding: 10px 10px 20px 10px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 4px;

  &>h3 {
    font-size: 16px;
    color: #304156;
    margin: 10px 0;
  }

  &>p {
    font-size: 14px;
    color: #777;
  }

  &>.link-group {
    margin-top: 20px;
    font-size: 12px;

    a {
      padding: 4px 15px;
      border: 1px solid #777;
      margin-right: 20px;
      color: #777;
      border-radius: 4px;

      &.primary {
        color: #1890ff;
        background: #e8f4ff;
        border-color: #a3d3ff;
      }
    }
  }
}

.project-tabs {
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
}

.card {
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 10px;
  box-sizing: border-box;

  h3 {
    font-size: 14px;
    color: #304156;
    margin-bottom: 10px;

    &>* {
      display: inline-block;
      vertical-align: middle;
      margin-right: 4px;
    }
  }

  p {
    margin-bottom: 10px;
    line-height: 22px;
    font-size: 14px;
    text-indent: 26px;

    &>* {
      vertical-align: middle;
      margin-right: 4px;
    }
  }

  .pay {
    width: 50%;
  }
}</style>
  
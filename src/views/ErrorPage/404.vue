<template>
    <div class="error">
      <h2>
        <i-ep-warning-filled></i-ep-warning-filled>
        <span>404 NotFound!</span>
      </h2>
      <p>您访问的地址不存在, <span>{{ time }}</span> 秒之后跳转到首页 </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import {useRouter} from "vue-router";
  
  const time = ref(3)
  const router = useRouter()
  const clearTimer = setInterval(() => {
    time.value--
    if(time.value <= 0){
      clearInterval(clearTimer)
      router.push("/")
    }
  }, 1000);
  </script>
  
  <style lang="less" scoped>
  .error{
      position: fixed;
      top: 20%;
      width: 100%;
      text-align: center;
  
      h2{
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;    
      }
      p{
          margin-top: 20px;
          font-size: 22px;
          span{
              color: #f00;
          }
      }
  }
  </style>
  
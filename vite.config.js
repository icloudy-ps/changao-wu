import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 自动按需导入的工具
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 自动导入图标
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
// 按需导入Element-plus的样式
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // 服务配置
  server:{
    // 配置代理: 实现跨域请求。注意, 控制台中看不到真实的服务端请求地址
    proxy: {
      // 匹配以/api开头的请求地址
      "/api" : { 
        target: "http://localhost:8888"  // 真正的服务请求地址
      },
      "/file" : { 
        target: "http://localhost:8888"
      }
    }
  },

  // 配置插件
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        // 自动导入element-plus的函数API
        ElementPlusResolver(),

        // 自动导入图标
        IconsResolver({
          prefix: "Icon"
        }),
      ],
    }),
    Components({
      resolvers: [
        // 自动注册element-plus的组件
        ElementPlusResolver(), 

        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']   // 在.vue文件中使用图标： <i-ep-图标名字>
        })
      ],
    }),
    
    Icons({autoInstall: true}),
    
    ElementPlus()
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

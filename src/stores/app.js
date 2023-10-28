import { defineStore } from "pinia";
import { setStorage, getStorage } from "../utils/storage"
export const useAppStore = defineStore("app",{
    state(){
        return {
            sidebarOpend:false , //侧边栏开关：true：折叠  false：展开
            tagsViewList:getStorage("tags") || []      //标签数组（记录访问过的路由）
        }
    },
    actions:{
        // 点击侧边栏开关：切换状态
        toggleSidebarSwitch(){
            this.sidebarOpend = !this.sidebarOpend
        },
        // 新增标签
        addTagsItem(tag){
            // 去重
            let isFind = this.tagsViewList.find(item => item.path === tag.path)
            if(!isFind){
                
                this.tagsViewList.push(tag)
                setStorage("tags",this.tagsViewList)
            }
        },
            // 
        // 删除标签
        deleteTagsItem(i){
            // 删除下表对应的1个成员
            this.tagsViewList.splice(i,1)
            // 更新storage中的tags数组
            setStorage("tags",this.tagsViewList)
        },
    }
})
import { defineStore } from "pinia";
import lessVariables from "../assets/styles/variable.module.less"
export const useThemeStore = defineStore("them",{
    state(){
        return{
            themeModel:"sunny" , //默认日间主题 ,moon 夜间
            lessVariables,  //导入的less值
        }
    },
    actions:{
        toggleThemeModel(){
            this.themeModel = this.themeModel === "sunny" ? "moon" : "sunny"

        }
    }
})
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path:'/',
        name:"首页",
        component:()=>import('../views/index.vue'),
        meta:{
            title:"首页"
        }
    },
    {
        path:'/project',
        name:"项目",
        component:()=>import('../views/project/index.vue'),
        meta:{
            title:"项目"
        }
    },
    {
      path:'/hash',
      name:"Hash加密",
      component:()=>import('../views/crypto/hash.vue'),
      meta:{
          title:"Hash加密"
      }
    },
    {
      path:'/aes',
      name:"AES加密",
      component:()=>import('../views/crypto/aes.vue'),
    }
    ,
    {
      path:'/todo',
      name:"Todo",
      component:()=>import('../views/todo/index.vue'),
      meta:{
        title:"Todo"
      }
    }
   
  ]
const router = createRouter({
    history:createWebHashHistory(),
    routes
  })
export default router
 
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path:'/',
        name:"首页",
        component:()=>import('../views/index.vue')
    },
    {
        path:'/project',
        name:"项目",
        component:()=>import('../views/project/index.vue')
    },
    {
      path:'/hash',
      name:"Hash加密",
      component:()=>import('../views/crypto/hash.vue')
    },
    {
      path:'/aes',
      name:"AES加密",
      component:()=>import('../views/crypto/aes.vue')
    }
    ,
    {
      path:'/todo',
      name:"Todo",
      component:()=>import('../views/todo/index.vue')
    }
   
  ]
const router = createRouter({
    history:createWebHashHistory(),
    routes
  })
export default router
 
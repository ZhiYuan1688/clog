<template>
  <a-layout class="!w-100% !h-100vh">
    <a-layout-sider
      hide-trigger
      collapsible
      class="layout-sider flex flex-col "
    >
    <div class="my-4 flex">
      <img class="w-32px h-32px m-auto" :src="require('@/assets/logo.svg')" alt="">

    </div>
      <a-menu
        :defaultOpenKeys="['1']"
        :defaultSelectedKeys="['/']"
        :style="{ width: '100%',height:'auto',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center' }"
        @menu-item-click="onClickMenuItem"
     
      >
        <!-- <div class="logo"></div> -->

        <a-menu-item key="/" class="menu-item ">
          <img class="w-32px h-32px" :src="require('@/assets/icons/home.svg')" alt="ds">
        </a-menu-item>
        <a-menu-item key="/project" class="menu-item ">
          <img class="w-32px h-32px" :src="require('@/assets/icons/project.svg')" alt="">
        </a-menu-item>
        <a-menu-item key="/todo" class="menu-item ">
          <img class="w-32px h-32px" :src="require('@/assets/icons/todo.svg')" alt="">
          
        </a-menu-item>
        <!-- <a-sub-menu key="1">
          <template #title> 逆向工具 </template> -->
           <a-menu-item key="/aes" class="menu-item">
            <img class="w-32px h-32px" :src="require('@/assets/icons/aes.svg')" alt="">
           </a-menu-item>
          <a-menu-item key="/hash" class="menu-item">
            <img class="w-32px h-32px" :src="require('@/assets/icons/aes.svg')" alt="">
          </a-menu-item>
         
          
      
      </a-menu>
    </a-layout-sider>
    <a-layout-content class="relative">
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>
<script setup>
import { require } from "@/utils/require.js";
import { onMounted } from "vue";
import router from "/src/router/index.js";
onMounted(() => {
  router.push("/");
});
const onClickMenuItem = (key) => {
  console.log(key)
  // 跳转路由
  router.push(key);
};
</script>
<style scoped>
.layout-sider {
  /* height: 100%; */
  background: #fff !important;
  width: 64px !important;
}
/* 在鼠标移入时显示滚动条 */
.layout-sider :deep(.arco-layout-sider-children) {
  overflow: hidden;
}

.layout-sider :deep(.arco-layout-sider-children):hover {
  overflow-y: auto;
}
:deep(.arco-menu-light .arco-menu-item.arco-menu-selected){
  background-color: #f1f1f1 !important;
  border-radius: 8px;
}

</style>

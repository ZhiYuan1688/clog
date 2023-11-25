
<template>
<div id="app">
 <!-- <button @click="md5">测试</button>
  <span>{{ text }}</span>  -->
  <layout />
</div>
</template>

<script setup>
// 测试前端调用rust

import { ref } from "vue";
import layout from "./components/layout.vue";
const text = ref("");
async function md5() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  text.value = await invoke("md5_hash", { text: "123666666456" });
}
</script>

<style scoped>
#app{
  height: 100vh;
  width: 100vw;
}
</style>
<style>
/* 修改滚动条的样式 */
/* Webkit浏览器 */
::-webkit-scrollbar {
  width: 2px; /* 滚动条宽度 */
  height: 8px !important;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* 滚动条轨道的背景颜色 */
}

::-webkit-scrollbar-thumb {
  background-color: #888; /* 滚动条的颜色 */
  border-radius: 6px; /* 滚动条的圆角 */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 滚动条在鼠标悬停时的颜色 */
}

</style>
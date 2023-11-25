<template>
  <!-- <div> -->
    <!-- md5加密 -->
    <div v-for="(v, index) in hash" class="flex flex-col px-4 py-2">
      <div class="flex flex-col justify-center gap-4">
        <div class="algorithm">{{ v.algorithm }}</div>

        <div class="feature-box">
          <span class="feature-text">{{ v.feature }}</span>
        </div>
      </div>

      <div class="w-full flex items-center justify-between gap-4 input-container">
        <a-textarea
          style="margin-top: 10px"
          v-model="text[index]"
          placeholder="输入明文"
          :auto-size="{
            minRows: 2,
            maxRows: 2,
          }"
          :max-length="1000"
          show-word-limit
          @change="handleInputChange(index, v.method)"
        ></a-textarea>
       

        <a-textarea
          v-model="result[index]"
          placeholder="等待明文填充中"
          @focus="copyResult(index)"
          :auto-size="{
            minRows: 2,
            maxRows: 2,
          }"
          :max-length="512"
          show-word-limit
          style="margin-top: 10px"
        />
      </div>
    </div>
  <!-- </div> -->
</template>

<script setup>
import { Message, Notification } from "@arco-design/web-vue";
import { invoke } from "@tauri-apps/api/tauri";
import { onMounted, ref } from "vue";
const text = ref([]);
const result = ref([]);
const hash = [
  {
    algorithm: "MD5",
    feature: "固定32位字母+数字，常见于sign signature x-sign等参数",
    method: "md5",
  },
  {
    algorithm: "SHA1",
    feature: "固定40位字母+数字，哈希函数。",
    method: "sha1",
  },
  {
    algorithm: "SHA256",
    feature: "固定64位字母+数字，哈希函数。",
    method: "sha256",
  },
  {
    algorithm: "SHA512",
    feature: "固定128位字母+数字，哈希函数。",
    method: "sha512",
  }
];
onMounted(()=>{
  Notification.info({
    content:"输入明文自动计算密文，或可点击小图标",
    style: { padding: '10px' },
    showIcon:false,
    duration:5000,
    closable:true,
  })
})
// 自动执行加密算法
const handleInputChange = async (index, method) => {
  const fn = method + "_hash";
  result.value[index] = await invoke(fn, { text: text.value[index] });
};
const copyResult = (i) => {
  console.log(1);
  if (!result.value[i]) return;
  navigator.clipboard.writeText(result.value[i]); // 将文本复制到剪贴板
  Message.success({ content: "复制成功", closable: true });
};
</script>

<style scoped>
/* HTML: <div class="loader"></div> */
.algorithm {
  width: fit-content;
  font-weight: bold;
  font-family: sans-serif;
  font-size: 24px;
  padding-bottom: 8px;
  color: blue;
  background: linear-gradient(currentColor 0 0) 0 100%/0% 3px no-repeat;
  animation: l2 2s linear infinite;
}

@keyframes l2 {
  to {
    background-size: 100% 3px;
  }
}
.feature-box {
  padding: 10px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}
.feature-text {
  font-size: 1.2em;
}
.feature-text:hover{
  color: #4f46e5;
}
</style>

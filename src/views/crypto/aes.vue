<template>
  <div class="p4">
    <!-- <div class="flex flex-col gap-4"> -->

    <a-form :model="{ name: '1' }" layout="vertical">
      <a-form-item
        field="name"
        tooltip="加密模式(padding默认Pkcs7)"
        label="模式"
      >
        <a-select v-model="mode" placeholder="选择模式 ...">
          <a-option>CBC</a-option>
          <a-option>ECB</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="name" tooltip="加密key(必填)" label="公钥">
        <a-input v-model="key" placeholder="please enter your username..." />
      </a-form-item>
      <a-form-item field="iv" label="偏移值" tooltip="CBC模式可选">
        <a-input
          v-model="iv"
          :disabled="ivShow"
          placeholder="请输入iv向量..."
        />
      </a-form-item>
      <a-form-item field="text" label="明文" tooltip="输入明文点击加密">
        <a-textarea
          placeholder="请输入明文"
          v-model="text"
          :auto-size="{ minRows: 3, maxRows: 3 }"
          :max-length="512"
          show-word-limit
        ></a-textarea>
      </a-form-item>
      <a-form-item field="text" label="操作">
        <div class="w-full flex items-center justify-between">
          <a-button @click="encrypto" type="primary">
            <template #icon>
              <icon-double-down />
            </template>
            加密
          </a-button>
          <a-button @click="decrypto" type="primary">
            <template #icon>
              <icon-double-up />
            </template>
            解密
          </a-button>
        </div>
      </a-form-item>
      <a-form-item field="result" label="密文" tooltip="输入密文点击解密">
        <a-textarea
          placeholder="加密结果"
          v-model="result"
          :auto-size="{ minRows: 5, maxRows: 5 }"
          :max-length="512"
          show-word-limit
        ></a-textarea>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { cbcDecrypt, cbcEncrypt, ecbDecrypt, ecbEncrypt } from "./crypto";
const text = ref("123");
const key = ref("1234567812345678");
const iv = ref("8765432187654321");
const mode = ref("CBC");
const result = ref("");
const ivShow = ref(false);
const encrypto = () => {
  const encryptionFunctions = {
    CBC: () => cbcEncrypt(text.value, key.value, iv.value),
    ECB: () => ecbEncrypt(text.value, key.value),
  };

  result.value = encryptionFunctions[mode.value]();
};

const decrypto = () => {
  const decryptionFunctions = {
    CBC: () => cbcDecrypt(result.value, key.value, iv.value),
    ECB: () => ecbDecrypt(result.value, key.value),
  };

  text.value = decryptionFunctions[mode.value]();
  if (text.value == "") text.value = "密文错误，请检查密文或密钥";
};

watch(mode, (newValue, oldValue) => {
  ivShow.value = !ivShow.value;
});
</script>

<style scoped></style>

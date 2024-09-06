<template>
  <div>
    <input v-model="inputText" placeholder="输入内容" />
    <button @click="handleTranslate">翻译</button>
    <trans-output :translateResult="translatedText"></trans-output>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TransOutput from './SonCom.vue'

const inputText = ref('')
const translatedText = ref('')

const handleTranslate = async () => {
  //调用翻译函数，实际使用时可以替换为真实的翻译 API调用
  console.log(1111)
  translatedText.value = inputText.value
}
</script>

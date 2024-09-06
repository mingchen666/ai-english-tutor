<template>
  <div>
    <el-input v-model="translateResult" type="textarea" readonly />
  </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  translateResult: {
    type: String,
    required: true
  }
})

//使用 toRefs保持响应式特性
const { translateResult } = toRefs(props)
</script>

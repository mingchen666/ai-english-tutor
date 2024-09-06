<script setup>
// import { ref } from 'vue'
import { computed } from 'vue'
import { useUserChatStore } from '@/stores'
const userChatStore = useUserChatStore()

//使用 computed来创建一个双向绑定的属性
const content = computed({
  get: () => userChatStore.writeContent,
  set: (value) => {
    userChatStore.setWriteContent(value)
  }
})
// const c=computed(())
</script>
<template>
  <el-input
    v-model="content"
    style="width: 100%"
    :rows="24"
    type="textarea"
    placeholder="请输入作文内容"
  />
</template>

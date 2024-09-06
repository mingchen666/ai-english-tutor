<script setup>
import { ref, watch } from 'vue'
import { useUserChatStore } from '@/stores'
import { Notification } from '@arco-design/web-vue'
const userChatStore = useUserChatStore()
const displayedMessage = ref('')
// 打字机效果函数
const typeText = (text, delay = 80) => {
  let index = 0

  displayedMessage.value = '' // 清空显示的文本，确保从头开始

  const timer = setInterval(() => {
    if (index < text.length) {
      displayedMessage.value += text[index]

      index++
    } else {
      // 弹窗通知
      Notification.success({
        title: '成功',
        content: '英语作文完成啦!',
        position: 'topLeft'
      })
      clearInterval(timer)
    }
  }, delay)
}

// 使用 watch 监听 userChatStore.message 的变化
watch(
  () => userChatStore.message,
  (newMessage) => {
    if (newMessage) {
      typeText(newMessage)
    }
  }
)

// textarea.value = userChatStore.message
// const textarea = ref('')
</script>
<template>
  <div
    v-loading="userChatStore.writeLoading"
    element-loading-text="Ai正在思考中..."
    background="rgba(255, 243, 230,0.7)"
  >
    <el-input
      v-model="displayedMessage"
      style="width: 100%"
      :rows="24"
      type="textarea"
      placeholder="作文内容"
      readonly
    />
  </div>
</template>

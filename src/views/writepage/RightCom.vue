<script setup>
import { ref } from 'vue'
import { useUserKeyStore, useUserChatStore } from '@/stores'
import { writeGenerate } from '@/api/writeAi'
import { Modal } from '@arco-design/web-vue'
const userChatStore = useUserChatStore()
const UserKeyStore = useUserKeyStore()
const writeForm = ref({ require: '' })
// 写作模型
const writeModel = ref()

// 读取模型列表并且转换
const models = UserKeyStore.userKeyInfo.AiModels
const modelsArray = models.split(',').map((item) => ({
  value: item,
  label: item
}))
const AiOptions = ref(modelsArray)
// 按钮->作文生成
const generateWrite = async () => {
  if (writeForm.value.require === '') {
    Modal.info({
      title: '提示',
      content: '作文要求不能为空哦！',
      'ok-text': '好的呢',
      width: '300px',
      'title-align': 'start'
    })
    return
  }
  if (!writeModel.value) {
    Modal.info({
      title: '提示',
      content: '请选择模型哦！',
      'ok-text': '好的呢',
      width: '300px',
      'title-align': 'start'
    })
    return
  }
  userChatStore.setWriteLoading(true)

  const res = await writeGenerate(writeForm.value.require, writeModel.value)
  // console.log('结果是', res)

  userChatStore.setWriteLoading(false)
  // 添加消息到列表
  userChatStore.addWriteMessage('assistant', res)
  userChatStore.setMessage(res)
}
</script>
<template>
  <div class="container">
    <!-- 作文要求表单 -->
    <el-form
      ref="ruleFormRef"
      style="width: 100%"
      :model="writeForm"
      status-icon
      label-width="auto"
      class="demo-writeForm"
    >
      <el-form-item label="作文要求:">
        <el-input
          v-model="writeForm.require"
          type="textarea"
          :rows="10"
          autocomplete="off"
          placeholder="请输入作文要求"
          class="write-content"
        />
      </el-form-item>
      <!-- 模型选择框 -->
      <el-form-item label="AI模型:">
        <el-select
          v-model="writeModel"
          placeholder="请选择模型"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in AiOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <a-button
      type="primary"
      status="success"
      size="large"
      shape="round"
      class="centered-button"
      @click="generateWrite"
      >一键生成</a-button
    >
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.centered-button {
  padding: 10px 50px;
  margin-bottom: 20px;
  width: 150px;
}

input:focus {
  outline: 0 !important;
}
.score {
  width: 100%;
}
.sub-btn {
  padding: 10px 20px;
}
.custom-score {
  font-family: 'Courier New', Courier, monospace;
  font-size: 28px;
  color: #ff6347;
  font-weight: bold;
}
</style>

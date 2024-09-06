<script setup>
import { ref } from 'vue'
import { useUserKeyStore, useUserChatStore } from '@/stores'
import { Modal } from '@arco-design/web-vue'
import { correctGenerate, scoreGenerate } from '@/api/correctAi'
const UserKeyStore = useUserKeyStore()
const userChatStore = useUserChatStore()
// 读取模型
const models = UserKeyStore.userKeyInfo.AiModels
const modelsArray = models.split(',').map((item) => ({
  value: item,
  label: item
}))
const AiOptions = ref(modelsArray)
const correctForm = ref({ require: '', correctModel: '' })
const scoreForm = ref({ totalScore: '', result: '' })
const score = ref('')
// 按钮-> 一键估分
const estimateScore = async () => {
  // 首先判断输入的作文内容是否为空
  if (!userChatStore.writeContent) {
    Modal.info({
      title: '提示',
      content: '请输入你的英语作文哦！',
      'ok-text': '好的呢',
      width: '300px',
      'title-align': 'start'
    })
    return
  }
  if (correctForm.value.require === '') {
    Modal.info({
      title: '提示',
      content: '作文要求不能为空哦！',
      'ok-text': '好的呢',
      width: '300px',
      'title-align': 'start'
    })
    return
  }
  if (!correctForm.value.correctModel) {
    Modal.info({
      title: '提示',
      content: '请选择模型哦！',
      'ok-text': '好的呢',
      width: '300px',
      'title-align': 'start'
    })
    return
  }
  if (!scoreForm.value.totalScore) {
    Modal.info({
      title: '提示',
      content: '请输入作文总分哦！',
      'ok-text': '好的呢',
      width: '300px',
      'title-align': 'start'
    })
    return
  }
  userChatStore.setScoreLoading(true)
  const res = await scoreGenerate(
    userChatStore.writeContent,
    correctForm.value.require,
    scoreForm.value.totalScore,
    correctForm.value.correctModel
  )
  score.value = res
  userChatStore.setScoreLoading(false)
  // 添加ai返回消息到列表
  userChatStore.addCorerectMessage('assistant', res)
}
// 按钮-> 一键分析
const generateAnalyse = async () => {
  // 首先判断输入的作文内容是否为空
  if (!userChatStore.writeContent) {
    Modal.info({
      title: '提示',
      content: '请输入你的英语作文哦！',
      'ok-text': '好的呢',
      width: '300px',
      'title-align': 'start'
    })
    return
  }
  if (correctForm.value.require === '') {
    Modal.info({
      title: '提示',
      content: '作文要求不能为空哦！',
      'ok-text': '好的呢',
      width: '300px',
      'title-align': 'start'
    })
    return
  }
  if (!correctForm.value.correctModel) {
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
  const res = await correctGenerate(
    userChatStore.writeContent,
    correctForm.value.require,
    correctForm.value.correctModel
  )
  scoreForm.value.result = res
  userChatStore.setWriteLoading(false)
  // 添加ai返回消息到列表
  userChatStore.addCorerectMessage('assistant', res)
}
// change--->模型选择框变化
const modelChange = () => {
  userChatStore.resetMessages()
}
</script>
<template>
  <div class="container">
    <div class="content">
      <el-form
        ref="ruleFormRef"
        style="width: 100%"
        :model="correctForm"
        status-icon
        label-width="auto"
        class="demo-writeForm"
      >
        <el-form-item label="作文要求:">
          <el-input
            v-model="correctForm.require"
            type="textarea"
            :rows="5"
            autocomplete="off"
            placeholder="请输入作文要求"
          />
        </el-form-item>
        <el-form-item label="AI模型:">
          <el-select
            v-model="correctForm.correctModel"
            placeholder="请选择模型"
            size="large"
            style="width: 240px"
            @change="modelChange"
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
    </div>
    <a-button
      type="primary"
      status="success"
      size="large"
      class="centered-button"
      @click="generateAnalyse"
      >一键分析</a-button
    >
    <!-- 作文估分表单 -->
    <el-form
      ref="ruleFormRef"
      style="width: 100%"
      :model="scoreForm"
      status-icon
      label-width="auto"
      class="demo-writeForm"
    >
      <el-form-item label="分析结果:">
        <!-- <el-input
          v-model="scoreForm.result"
          class="box"
          type="textarea"
          readonly
          :rows="10"
          >xxxx</el-input  scoreForm.result
        > -->
        <el-scrollbar
          class="result"
          height="200px"
          v-loading="userChatStore.writeLoading"
          element-loading-text="Ai正在分析中..."
        >
          <v-md-preview :text="scoreForm.result" height="200px"></v-md-preview>
        </el-scrollbar>
      </el-form-item>
      <el-form-item label="作文总分:">
        <el-input
          v-model.number="scoreForm.totalScore"
          type="text"
          autocomplete="off"
          placeholder="请输入作文总分"
        />
      </el-form-item>
    </el-form>
    <el-button class="sub-btn" type="primary" @click="estimateScore">
      一键估分
    </el-button>

    <div class="score" v-loading="false">
      <h3
        v-loading="userChatStore.scoreLoading"
        element-loading-text="Ai正在思考中..."
      >
        作文估分结果: <span class="custom-score">{{ score }}</span>
      </h3>
    </div>
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
  margin-bottom: 10px;
  width: 100px;
}

.content {
  width: 100%;
  max-width: 600px;
  /* margin-bottom: 10px; */
}

.box {
  border: 1px solid #ccc; /*边框 */
  overflow: auto; /*如果内容超出高度，显示滚动条 */
  background-color: #f1adad; /*背景颜色 */
  border-radius: 5px; /*圆角 */
  cursor: default; /*去除鼠标竖杠 */
  caret-color: transparent; /*去除光标 */
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
.result {
  width: 100%;
  height: 200px;
  border: 2px solid #ccc;
  padding: 0;
  overflow-y: auto; /*内容过多时显示滚动条 */
}
</style>

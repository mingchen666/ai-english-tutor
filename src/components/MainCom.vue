<script setup>
// import { ElMessageBox, ElMessage } from 'element-plus'
import BaiduTranslate from '@/api/BaiduFanyi'
import { useUserKeyStore } from '@/stores'
import { LlmTranslateFree, LlmTranslateDerect } from '@/api/AiFanyi'
import { ref } from 'vue'
import { provide } from 'vue'
import TransformSelect from '@/views/components/TransformSelect.vue'
import TransOutput from '@/views/homepage/TransOutput.vue'
import { Modal } from '@arco-design/web-vue'
const transSource = ref()
const fromLanguage = ref('')
// 机器翻译加载中效果
const JqCardLoading = ref(false)
// Ai翻译加载中效果
const AiCardFreeLoading = ref(false)
const AiCardDerectLoading = ref(false)
const toLanguage = ref('')
// 选中ai翻译模型
const transModel = ref()
const UserKeyStore = useUserKeyStore()

// 需要翻译的文本
const translateText = ref('')
// 翻译结果
const translateResult = ref('')
// 机器翻译结果
const JqtranslateResult = ref('')
// Ai翻译结果- >直译
const AitranslateResultDerect = ref('')
// Ai翻译结果- >意译
const AitranslateResultFree = ref('')
const JqOptions = ref([
  {
    value: '百度翻译',
    label: '百度翻译'
  },
  {
    value: '有道翻译',
    label: '有道翻译'
  },
  {
    value: '等待添加',
    label: '等待添加'
  }
])
// 读取模型列表并且转换
const models = UserKeyStore.userKeyInfo.AiModels
const modelsArray = models.split(',').map((item) => ({
  value: item,
  label: item
}))
const AiOptions = ref(modelsArray)
const TwoLanguages = (data) => {
  fromLanguage.value = data.fromLanguage
  toLanguage.value = data.toLanguage
}

// 按钮-> 机器翻译
const JqTranslate = async (transSource) => {
  if (translateText.value === '') {
    Modal.info({
      title: '提示',
      content: '内容不能为空哦！',
      'ok-text': '好的呢',
      width: '300px',
      'title-align': 'start'
    })
    return
  }
  if (!transSource) {
    Modal.info({
      title: '提示',
      content: '请选择翻译源哦！',
      'ok-text': '好的呢',
      width: '300px',
      'title-align': 'start'
    })
    return
  }
  switch (transSource) {
    case '百度翻译':
      JqCardLoading.value = true
      JqtranslateResult.value = await BaiduTranslate(
        translateText.value,
        fromLanguage.value,
        toLanguage.value
      )
      JqCardLoading.value = false
      // console.log(translateResult.value)
      console.log('百度翻译')
      break
    case '有道翻译':
      Modal.info({
        title: '提示',
        content: '有道翻译暂未实现哦！',
        'ok-text': '好的呢',
        width: '300px',
        'title-align': 'start'
      })
      return
    case '等待添加':
      break
    default:
      return
  }
}
// 按钮-> Ai翻译
const AiTranslate = async () => {
  if (translateText.value === '') {
    Modal.info({
      title: '提示',
      content: '内容不能为空哦！',
      'ok-text': '好的呢',
      width: '300px',
      'title-align': 'start'
    })
    return
  }
  if (!transModel.value) {
    Modal.info({
      title: '提示',
      content: '请选择模型哦！',
      'ok-text': '好的呢',
      width: '300px',
      'title-align': 'start'
    })
    return
  }
  // 显示加载中效果
  AiCardFreeLoading.value = true
  AiCardDerectLoading.value = true
  AitranslateResultFree.value = await LlmTranslateFree(
    translateText.value,
    transModel.value
  )
  AiCardFreeLoading.value = false
  console.log('意译', AitranslateResultFree.value)
  AitranslateResultDerect.value = await LlmTranslateDerect(
    translateText.value,
    transModel.value
  )
  AiCardDerectLoading.value = false
  console.log('直译', AitranslateResultDerect.value)
}
// 对比翻译
const contrastTranslate = (transSource) => {
  JqTranslate(transSource)
  AiTranslate()
}
// 传递给子孙组件
provide('title', transSource)
provide('AitranslateResultFree', AitranslateResultFree)
provide('AitranslateResultDerect', AitranslateResultDerect)
provide('JqtranslateResult', JqtranslateResult)
provide('JqCardLoading', JqCardLoading)
provide('AiCardFreeLoading', AiCardFreeLoading)
provide('AiCardDerectLoading', AiCardDerectLoading)
</script>
<template>
  <el-row class="main-container">
    <!-- <el-button @click="open">测试</el-button> -->
    <!-- 左边 -->
    <el-col :span="12" class="main-left-container">
      <transform-select @TwoLanguages="TwoLanguages"></transform-select>
      <!-- 输入框 -->
      <el-input
        v-model="translateText"
        style="width: 90%"
        :rows="7"
        type="textarea"
        show-word-limit
        maxlength="3000"
        class="input-textarea"
        placeholder="请输入需要翻译的文本"
      />
      <el-row style="width: 90%">
        <el-col class="flex flex-nowrap select-container">
          <!--选择机器翻译源 -->
          <el-select
            v-model="transSource"
            placeholder="请选择机器翻译源"
            size="large"
            class="select-two-thirds"
          >
            <el-option
              v-for="item in JqOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button
            @click="JqTranslate(transSource)"
            type="primary"
            size="large"
            class="jq-translate-btn"
            >机器翻译</el-button
          >
        </el-col>
      </el-row>
      <el-row style="width: 90%">
        <el-col class="flex flex-nowrap select-container">
          <!--选择ai翻译模型 -->
          <el-select
            v-model="transModel"
            placeholder="请选择模型"
            size="large"
            class="select-two-thirds"
          >
            <el-option
              v-for="item in AiOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button
            @click="AiTranslate"
            type="primary"
            size="large"
            class="jq-translate-btn"
            >AI翻译</el-button
          >
        </el-col>
      </el-row>
      <div class="button-container">
        <el-button
          @click="contrastTranslate(transSource)"
          type="primary"
          size="large"
          class="contrast-translate-btn"
          >对比翻译</el-button
        >
      </div>
    </el-col>
    <!-- 右边 -->
    <el-col :span="12" class="main-right-container"
      ><TransOutput :translateResult="translateResult"></TransOutput>
      <div class="grid-content ep-bg-purple-light" />
    </el-col>
  </el-row>
</template>
<style>
/* .main-container .main-left-container {
} */
.main-left-container,
.main-right-container {
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  flex-direction: column;
}

.main-left-container .contrast-translate-btn {
  display: flex;
  justify-content: center;
  width: 300px;
}

.input-textarea {
  font-size: 18px;
}

.main-left-container > .button-container {
  width: 90%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.select-container {
  display: flex;
  margin-top: 40px;
  /* width: 90%; */
  gap: 20px;
}

.select-two-thirds {
  flex: 2;
}

.jq-translate-btn {
  display: flex;
  flex: 1;
  justify-content: center;
  /*水平居中 */
  align-items: center;
  /*垂直居中 */
}

.main-right-container {
  display: flex;
}
</style>

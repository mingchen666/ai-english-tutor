<template>
  <div class="language-converter">
    <el-select
      @change="LanguageValueChange"
      v-model="fromLanguage"
      placeholder="选择源语言"
    >
      <el-option label="中文" value="zh"></el-option>
      <el-option label="英文" value="en"></el-option>
      <!-- <el-option label="日文" value="ja"></el-option> -->
    </el-select>
    <el-icon class="convert-icon" @click="switchLanguage">
      <el-icon><Switch /></el-icon>
    </el-icon>
    <el-select
      @change="LanguageValueChange"
      v-model="toLanguage"
      placeholder="选择目标语言"
    >
      <el-option label="中文" value="zh"></el-option>
      <el-option label="英文" value="en"></el-option>
      <!-- <el-option label="日文" value="ja"></el-option> -->
    </el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Switch } from '@element-plus/icons-vue'
const emit = defineEmits(['TwoLanguages'])
const fromLanguage = ref('en')
const toLanguage = ref('zh')
const switchLanguage = () => {
  if (fromLanguage.value !== toLanguage.value) {
    const aa = fromLanguage.value
    fromLanguage.value = toLanguage.value
    toLanguage.value = aa
  }
}
// 监听两个选择框变化，并且传递给父组件
const LanguageValueChange = () => {
  emit('TwoLanguages', {
    fromLanguage: fromLanguage.value,
    toLanguage: toLanguage.value
  })
}
// 初始化转换语言
LanguageValueChange()
</script>

<style scoped>
.language-converter {
  display: flex;
  align-items: center;
  height: 50px;
}

.el-select {
  width: 150px;
}

.convert-icon {
  margin: 0 20px;
  cursor: pointer;
}
</style>

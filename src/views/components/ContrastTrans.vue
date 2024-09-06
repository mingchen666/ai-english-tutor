<script setup>
import JqContrastCard from './JqContrastCard.vue'
import AiContrastCard from './AiContrastCard.vue'
import { inject } from 'vue'
const JqtranslateResult = inject('JqtranslateResult')
const JqCardLoading = inject('JqCardLoading')
</script>
<template>
  <!-- 机器翻译对比卡片 -->
  <div :style="{ display: 'flex', width: '100%' }">
    <a-card title="机器翻译" class="jq-trans-card" :style="{ width: '100%' }">
      <el-scrollbar max-height="400px" v-loading="JqCardLoading">
        <JqContrastCard :translateResult="JqtranslateResult"></JqContrastCard>
      </el-scrollbar>
    </a-card>
  </div>
  <!-- AI翻译对比卡片 -->
  <AiContrastCard></AiContrastCard>
</template>

<style scoped>
.jq-trans-card {
  /* display: flex; */
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background-color: #e4e2e2;
  /* padding: 20px; */
  margin: 20px auto;
  max-width: 800px;
  /* min-height: 200px;  */
}
</style>

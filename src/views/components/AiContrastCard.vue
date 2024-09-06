<script setup>
import JqContrastCard from './JqContrastCard.vue'
import { inject } from 'vue'
const AitranslateResultDerect = inject('AitranslateResultDerect')
const AitranslateResultFree = inject('AitranslateResultFree')
const AiCardDerectLoading = inject('AiCardDerectLoading')
const AiCardFreeLoading = inject('AiCardFreeLoading')
</script>
<template>
  <div
    :style="{
      display: 'flex',
      width: '100%',
      boxSizing: 'border-box'
    }"
  >
    <a-card
      class="jq-trans-card"
      :style="{ width: '100%' }"
      title="AI翻译"
      bordered
    >
      <!-- <template #extra>
        <a-link>More</a-link>
      </template> -->
      <div>
        <a-split
          :style="{
            height: '240px',
            'max-height': '300px',
            width: '100%',
            minWidth: '100%',
            border: '1px solid var(--color-border)'
          }"
          min="80px"
        >
          <!-- 分割框左边 -->
          <template #first>
            <a-typography-paragraph v-loading="AiCardDerectLoading"
              ><JqContrastCard
                :title="'直译'"
                :translateResult="AitranslateResultDerect"
              ></JqContrastCard>
            </a-typography-paragraph>
          </template>
          <!-- 分割框右边 -->
          <template #second>
            <a-typography-paragraph v-loading="AiCardFreeLoading">
              <JqContrastCard
                :title="'意译'"
                :translateResult="AitranslateResultFree"
              ></JqContrastCard>
            </a-typography-paragraph>
          </template>
        </a-split>
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.jq-trans-card {
  /* display: flex; */
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  background-color: #f0efef;
  /* padding: 20px; */
  margin: 20px auto;
  max-width: 800px;
}
.jq-trans-card .a-card {
  /* padding: 20px; */
  font-size: 10px;
}
</style>

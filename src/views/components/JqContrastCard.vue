<script setup>
import { inject, toRefs } from 'vue'
const title = inject('title', '【机器翻译】')
const props = defineProps({ translateResult: { type: String } })
const { translateResult } = toRefs(props)
</script>
<template>
  <a-card
    :title="title"
    :style="{
      width: '90%',
      'min-height': '200px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }"
    hoverable
    class="jq-contrast-card"
  >
    <template #extra>
      <a-link>复制</a-link>
    </template>
    <div class="card-content" v-loading="false">
      {{ translateResult }}
    </div>
  </a-card>
</template>
<style scoped>
.jq-contrast-card {
  /* height: 100px; */
  /* margin: 20px; */
  background-color: #d6eff7;
  transition-property: all;
  margin: 10px auto;
}
.jq-contrast-card:hover {
  transform: translateY(-3px);
}
.card-content {
  padding: 10px;
  color: #333;
  font-size: 15px;
  line-height: 1.1;
}
</style>

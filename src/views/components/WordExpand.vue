<script setup>
import { ref } from 'vue'
const synonyms = ref([
  'aaaaa',
  'bbbbb',
  'ccccc',
  'ddddd',
  'aaaaa',
  'bbbbb',
  'ccccc'
])
const antonyms = ref(['eeeee', 'fffff', 'ggggg', 'hhhhh'])
</script>
<template>
  <a-collapse :default-active-key="[]" :bordered="false">
    <a-collapse-item key="1" style="margin: 0; padding: 0">
      <template #header>
        <h4>单词扩展</h4>
      </template>
      <h4>近义词:</h4>
      <div class="synonyms">
        <span v-for="(item, index) in synonyms" :key="index">{{ item }}</span>
      </div>

      <p></p>
      <h4>反义词:</h4>
      <div class="antonyms">
        <span v-for="(antonym, index) in antonyms" :key="index">{{
          antonym
        }}</span>
      </div>
      <!-- <v-md-preview :text="text" :tab-size="6" /> -->
    </a-collapse-item>
  </a-collapse>
</template>
<style scoped>
.synonyms,
.antonyms {
  display: flex;
  flex-wrap: wrap;
}
.synonyms span,
.antonyms span {
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>

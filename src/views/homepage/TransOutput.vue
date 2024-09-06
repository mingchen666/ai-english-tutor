<script setup>
import { toRefs } from 'vue'
import WordMeaning from '../components/WordMeaning.vue'
import WordExpand from '../components/WordExpand.vue'
import ContrastTrans from '../components/ContrastTrans.vue'
const props = defineProps({
  translateResult: { type: String },
  loading: { type: Boolean }
})
const { translateResult, loading } = toRefs(props)

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>
<template>
  <!-- 翻译结果展示框 ---- 关闭 -->
  <div v-if="false" :style="{ display: 'flex' }" class="trans-card">
    <a-card :style="{ width: '100%' }" hoverable>
      <template #title>
        <h4>翻译结果</h4>
      </template>
      <template #extra>
        <a-link>复制</a-link>
      </template>
      <el-input
        v-loading="loading"
        v-model="translateResult"
        type="textarea"
        readonly
        :rows="7"
        class="custom-textarea"
      />
      <!-- <div v-if="false" v-html="translateText"></div> -->
      <!-- 词义解释卡片 -->
      <el-card v-if="false" class="markdown-preview-card">
        <word-meaning v-if="false"></word-meaning>
        <!-- <h4>词性:</h4>
        <v-md-preview :text="text" :tab-size="6" /> -->
      </el-card>
    </a-card>
  </div>
  <!-- 词性扩展---废弃 -->
  <el-card
    v-if="false"
    class="markdown-preview-card"
    :style="{ width: '100%' }"
  >
    <word-expand></word-expand>
  </el-card>
  <!-- 常见短语搭配 ---废弃-->
  <div v-if="false" :style="{ display: 'flex' }">
    <a-card :style="{ width: '100%' }" bordered>
      <!-- <template #extra>
        <a-link>More</a-link>
      </template> -->
      <template #title>
        <h3>常见短语搭配</h3>
      </template>
      <br />
      <el-table :data="tableData" border height="200">
        <el-table-column prop="date" label="短语搭配" />
        <el-table-column prop="name" label="含义" />
      </el-table>

      <!-- 暂时不写 -->
      <!-- <h4>例句用法</h4> -->
    </a-card>
  </div>
  <!-- 句子对比翻译 -->
  <ContrastTrans></ContrastTrans>
</template>
<style scoped>
.card-demo {
  width: 360px;
  margin-left: 24px;
  transition-property: all;
}
.card-demo:hover {
  transform: translateY(-4px);
}
h2,
h4,
p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  /* margin: 0; */
  /* margin-bottom: 10px; */
}
.el-table {
  display: flex;
  margin: 0;
  padding: 0;
  overflow: auto; /*防止表格内容过多时影响布局 */
}
/* markdown渲染卡片样式 */
.trans-card .a-card {
  background-color: rgb(214, 219, 241);
  height: 150px; /*设置卡片组件的高度，可以根据需要调整 */
  border: 1px solid #ccc; /*增加边框以便观察 */
}
.markdown-preview-card {
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  background-color: #e4e2e2;
  /* padding: 20px; */
  margin: 20px auto;
  max-width: 800px;
}

/* 调整 v-md-preview 组件与卡片边距的距离 */
.markdown-preview-card .v-md-preview {
  margin-top: 5px;
  margin-bottom: 5px;
}
.custom-textarea {
  font-size: 18px;
  /* background-color: #d32929; */
}

.custom-textarea .el-textarea__inner:focus {
  outline: none;
  box-shadow: none;
}

arco-card-size-medium .arco-card-header {
  height: 50px;
}
</style>

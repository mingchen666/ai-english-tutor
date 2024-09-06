<script setup>
const text = `
n.艺术 ( 包括绘画、雕塑、音乐、舞蹈、文学等 );技术，技艺;方法，诀窍，本领;美术 ( 指绘画、绘图和雕塑 );人文科学，文科;艺术技巧;(总称)美术 ( 作 ) 品；艺术 ( 作 ) 品
v.<古>be的现在式单数第二人称

adj.美术 ( 或艺术 ) ( 品 ) 的；美术 ( 或艺术 ) 家的
`
</script>
<template>
  <a-collapse :default-active-key="['1']" :bordered="false">
    <a-collapse-item key="1" style="margin: 0; padding: 0">
      <template #header>
        <h4>词性</h4>
      </template>
      <v-md-preview :text="text" :tab-size="6" />
    </a-collapse-item>
  </a-collapse>
</template>

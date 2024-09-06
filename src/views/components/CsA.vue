<template>
  <div>
    <h4>近义词:</h4>
    <div class="synonyms">
      <span v-for="(synonym, index) in synonyms" :key="index">{{
        synonym
      }}</span>
    </div>
    <h4>反义词:</h4>
    <div class="antonyms">
      <span v-for="(antonym, index) in antonyms" :key="index">{{
        antonym
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      synonyms: ['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'aaaaa', 'bbbbb', 'ccccc'],
      antonyms: ['eeeee', 'fffff', 'ggggg', 'hhhhh']
    }
  }
}
</script>

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

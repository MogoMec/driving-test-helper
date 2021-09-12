<template>
  <div class="container">
    请选择:
    <button
      class="option"
      v-for="(item, index) in options"
      :key="index"
      @click="selected(index)"
    >
      {{ item }}
    </button>
    <button v-show="questionType === 'm-choice'">
      确认
    </button>
  </div>
</template>
<script>
export default {
  props: {
    questionType: String
  },
  data() {
    return {
      options: [],
      answer: []
    }
  },
  watch: {
    questionType: function(newType) {
      const arr = ['A', 'B', 'C', 'D']
      if (newType !== 'judge') {
        this.options = arr
      } else {
        this.options = arr.slice(0, 2)
      }
      console.log(this.options)
    }
  },
  methods: {
    initOptions() {
      const arr = ['A', 'B', 'C', 'D']
      if (this.questionType !== 'judge') {
        this.options = arr
      } else {
        this.options = arr.slice(0, 2)
      }
      console.log(this.options)
    },
    selected(index) {
      console.log(index)
      this.answer.push(index)
      if (this.questionType !== 'm-choice') {
        this.commitAnswer()
      }
    },
    commitAnswer() {
      this.$emit('commit', this.answer)
    }
  },
  created() {
    this.initOptions()
  }
}
</script>
<style lang="less" scoped>
button {
  margin: 0 10px;
  padding: 10px 15px;
  border: 1px solid #999;
  font-size: 18px;
}
</style>

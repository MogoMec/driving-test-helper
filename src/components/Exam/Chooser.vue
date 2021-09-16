<template>
  <div class="container">
    请选择:
    <button
      :class="isActive(index)"
      v-for="(item, index) in options"
      :key="index"
      @click="selected(index, $event)"
    >
      {{ item }}
    </button>
    <button v-show="questionType === 'm-choice'" @click="commitAnswer">
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
    }
  },
  methods: {
    // 初始化选项列表
    initOptions() {
      const arr = ['A', 'B', 'C', 'D']
      if (this.questionType !== 'judge') {
        this.options = arr
      } else {
        this.options = arr.slice(0, 2)
      }
      console.log(this.options)
    },
    selected(index, e) {
      // e.target.style.color = '#999'
      if (this.answer.includes(index)) {
        this.answer.splice(this.answer.indexOf(index), 1)
      } else {
        this.answer.push(index)
      }
      console.log(this.answer)
      if (this.questionType !== 'm-choice') {
        this.commitAnswer()
      }
    },
    commitAnswer() {
      this.$emit('commit', this.answer)
      this.answer = []
    },
    // 动态绑定按钮样式
    isActive(index) {
      if (this.answer.includes(index)) {
        return 'active'
      }
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
.active {
  background-color: #999;
}
</style>

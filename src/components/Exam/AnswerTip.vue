<template>
  <div class="tip_container">
    <span class="judge" :class="{ right: isRight }">{{ judgeInfo }}</span>
    <span>您的答案：{{ res.userAnswer }}</span>
    <span>正确答案：{{ res.trueAnswer }}</span>
  </div>
</template>
<script>
export default {
  props: {
    res: {
      type: Object,
      default: () => {
        return {
          judge: false,
          trueAnswer: '',
          userAnswer: ''
        }
      }
    }
  },
  computed: {
    isRight() {
      return this.res.judge
    },
    judgeInfo() {
      if (this.res.judge) {
        return '回答正确！'
      }
      return '回答错误！'
    }
  }
}
</script>
<style lang="less" scoped>
.judge {
  color: #ee4653;
}
.right {
  color: #27aae2;
}
span {
  margin: 0 10px;
}
</style>

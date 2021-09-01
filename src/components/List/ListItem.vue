<template>
  <div class="list_item_box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ question.question }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          操作按钮
        </el-button>
      </div>
      <div v-for="(item, index) in optionList" :key="index" class="option_list">
        {{ item }}
      </div>
      <div class="answer">
        <span>答案：</span>
        {{ question.answer }}
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    question: Object
  },
  computed: {
    optionList() {
      const option = []
      if ('option1' in this.question) {
        Object.keys(this.question)
          .filter(key => !(key.indexOf('option') === -1))
          .forEach(key => {
            option.push(this.question[key])
          })
      }
      return option
    }
  }
}
</script>
<style lang="less" scoped>
.list_item_box {
  text-align: initial;
}
.answer {
  padding-top: 20px;
}
</style>

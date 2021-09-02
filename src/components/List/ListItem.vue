<template>
  <div class="list_item_box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="index">{{ index + '. ' }}</span>
        <span>{{ question.question }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          收藏
        </el-button>
      </div>
      <div class="option">
        <div class="option_list">
          <div
            v-for="(item, index) in optionList"
            :key="index"
            class="option_item"
          >
            {{ item }}
          </div>
        </div>
        <div class="pic">
          <img :src="question.pic" alt="" />
        </div>
      </div>
      <div class="answer">
        答案：
        <span class="answer_content">{{ question.answer }}</span>
      </div>
      <div class="explain">
        解释：
        {{ question.explain }}
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    question: Object,
    pagesize: Number,
    pagenum: Number,
    singlepageindex: Number
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
    },
    index() {
      return this.pagesize * (this.pagenum - 1) + this.singlepageindex + 1
    }
  }
}
</script>
<style lang="less" scoped>
.list_item_box {
  text-align: initial;
  line-height: 1.5em;
}
.answer {
  padding-top: 20px;
}
.explain {
  padding-top: 20px;
  line-height: 1.5em;
}
.answer_content {
  color: #409eff;
}
.option {
  display: flex;
  justify-content: space-between;
}
</style>

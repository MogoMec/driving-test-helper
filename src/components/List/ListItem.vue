<template>
  <div class="list_item_box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="index">{{ question.index + '. ' }}</span>
        <span>{{ question.question }}</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="collectQuestion"
        >
          收藏
        </el-button>
      </div>
      <div class="option">
        <div class="option_list">
          <div
            v-for="(item, index) in question.optionList"
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
    question: Object
  },
  computed: {},
  methods: {
    collectQuestion() {
      console.log(this.question)
      const targetQuestion = JSON.stringify(this.question)
      console.log(JSON.parse(targetQuestion))
      localStorage.test = targetQuestion
      console.log(localStorage.test)
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
.pic {
  img {
    width: 400px;
  }
}
</style>

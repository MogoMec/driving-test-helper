<template>
  <div class="list_box">
    题目列表
    <button @click="test">测试</button>
    <ListItem
      v-for="(item, index) in questionList"
      :key="index"
      class="list_item"
      :question="item"
    ></ListItem>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
import { getQuestionList } from '@/network/request.js'
export default {
  data() {
    return {
      questionList: [],
      queryInfo: {
        type: this.$store.state.type,
        subject: this.$store.state.subject,
        pagesize: 20,
        pagenum: 1,
        sort: 'normal'
      }
    }
  },
  components: {
    ListItem
  },
  computed: {
    getURL() {
      return Object.keys(this.queryInfo)
        .map(key => {
          return key + '=' + this.queryInfo[key]
        })
        .join('&')
    }
  },
  methods: {
    test() {
      console.log(
        Object.keys(this.queryInfo)
          .map(key => {
            return key + '=' + this.queryInfo[key]
          })
          .join('&')
      )
    },
    getQuestionList() {
      getQuestionList(this.getURL).then(res => {
        this.questionList = res.result.result.list
      })
    }
  },
  created() {
    this.getQuestionList()
  }
}
</script>

<style lang="less" scoped>
.list_item {
  margin: 20px;
}
</style>

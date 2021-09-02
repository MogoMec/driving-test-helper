<template>
  <div class="list_box">
    <ListItem
      v-for="(item, index) in questionList"
      :key="index"
      class="list_item"
      :question="item"
      :pagesize="queryInfo.pagesize"
      :pagenum="queryInfo.pagenum"
      :singlepageindex="index"
    ></ListItem>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
import { getQuestionList } from '@/network/request.js'
export default {
  data() {
    return {
      questionList: [],
      total: 0,
      queryInfo: {
        sort: 'random',
        pagesize: 20,
        pagenum: 1
      }
    }
  },
  components: {
    ListItem
  },
  computed: {
    getType() {
      return this.$store.state.type
    },
    getSubject() {
      return this.$store.state.subject
    },
    fullqueryInfo() {
      const queryInfo = {
        ...this.queryInfo
      }
      queryInfo.type = this.getType
      queryInfo.subject = this.getSubject
      return queryInfo
    },
    getURL() {
      return (
        '&' +
        Object.keys(this.fullqueryInfo)
          .map(key => {
            return key + '=' + this.fullqueryInfo[key]
          })
          .join('&')
      )
    }
  },
  watch: {
    fullqueryInfo: {
      handler() {
        this.getQuestionList()
      },
      deep: true
    }
  },
  methods: {
    getQuestionList() {
      getQuestionList(this.getURL).then(res => {
        this.questionList = res.result.result.list
        this.total = res.result.result.total
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      // this.getQuestionList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      // this.getQuestionList()
    }
  },
  created() {
    this.getQuestionList()
    console.log(this.getType)
  }
}
</script>

<style lang="less" scoped>
.list_item {
  margin: 20px;
}
</style>

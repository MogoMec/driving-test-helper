<template>
  <div class="list_box">
    <!-- 骨架屏 -->
    <el-skeleton :loading="loading" animated :count="4">
      <!-- 加载时显示 -->
      <template slot="template">
        <div style="padding: 14px;" class="item">
          <div class="title_box">
            <el-skeleton-item variant="h3" class="fake_title" />
          </div>
          <div class="content_box">
            <el-skeleton-item variant="text" class="fake_option" />
            <el-skeleton-item variant="text" class="fake_option" />
            <el-skeleton-item variant="text" class="fake_option" />
            <el-skeleton-item variant="text" class="fake_option" />
            <el-skeleton-item variant="text" class="fake_answer" />
            <el-skeleton-item variant="text" class="fake_explain" />
          </div>
        </div>
      </template>
      <!-- 加载出的真正内容 -->
      <template>
        <ListItem
          v-for="(item, index) in questionList"
          :key="index"
          class="list_item"
          :question="item"
        ></ListItem>
      </template>
    </el-skeleton>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[20, 50, 100]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
import { getQuestionList } from '@/network/request.js'
import { getNormalContent } from '@/utils/utils.js'
export default {
  data() {
    return {
      loading: true,
      questionList: [],
      total: 0,
      queryInfo: {
        sort: 'normal',
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
      this.loading = true
      getQuestionList(this.getURL).then(res => {
        this.questionList = []
        res.list.forEach((item, index) => {
          const common = getNormalContent(item)
          common.index =
            this.queryInfo.pagesize * (this.queryInfo.pagenum - 1) + index + 1
          this.questionList.push(common)
          return common
        })
        this.total = res.total
        this.loading = false
        this.$message.success({
          message: '题目获取成功',
          offset: 115,
          duration: 2000
        })
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      scrollTo(0, 0)
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
.item {
  margin: 20px;
  display: flex;
  flex-direction: column;
}
.fake_title {
  height: 24px;
  width: 50%;
}
.fake_option {
  width: 20%;
  height: 22px;
  margin: 4px 0;
}
.title_box {
  display: flex;
  padding: 18px 20px;
}
.content_box {
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.fake_answer {
  width: 10%;
  height: 22px;
  margin: 24px 0;
}
.fake_explain {
  height: 22px;
}
</style>

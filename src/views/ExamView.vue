<template>
  <div class="test_view_box">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="340px">
      <span>
        {{ hintText[getSubject] }}
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            dialogVisible = false
            isStart = true
          "
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
    <ExamPanel :isStart="isStart" v-if="load"></ExamPanel>
  </div>
</template>
<script>
import ExamPanel from '@/components/Exam/ExamPanel.vue'
export default {
  data() {
    return {
      load: true,
      isStart: false,
      dialogVisible: true,
      hintText: {
        1: '按交管部门通知，科目一考试系统全面更新。模拟考试下不能修改答案，每做一题，系统自动计算错误题数，及格标准为90分，共100题，每题1分，考试时间45分钟。',
        4: '按交管部门通知，科目四考试系统全面更新。模拟考试下不能修改答案，每做一题，系统自动计算错误题数，及格标准为90分，共50题，每题2分，考试时间45分钟。'
      }
    }
  },
  computed: {
    getSubject() {
      return this.$store.state.subject
    }
  },
  watch: {
    getSubject: function() {
      this.dialogVisible = true
      this.isStart = false
      this.load = false
      setTimeout(() => {
        this.load = true
      }, 10)
    }
  },
  components: {
    ExamPanel
  }
}
</script>
<style lang="less" scoped></style>

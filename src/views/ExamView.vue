<template>
  <div class="test_view_box">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="340px"
    >
      <span>
        {{ text }}
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="loadTest">
          {{ buttonText }}
        </el-button>
      </span>
    </el-dialog>
    <ExamPanel
      :isStart="isStart"
      v-if="load"
      @testFailed="
        dialogVisible = true
        status = 'fail'
      "
      @testPass="testPass(score)"
    ></ExamPanel>
  </div>
</template>
<script>
import ExamPanel from '@/components/Exam/ExamPanel.vue'
export default {
  data() {
    return {
      load: true,
      status: 'init',
      isStart: false,
      dialogVisible: true,
      hintText: {
        1: '按交管部门通知，科目一考试系统全面更新。模拟考试下不能修改答案，每做一题，系统自动计算错误题数，及格标准为90分，共100题，每题1分，考试时间45分钟。',
        4: '按交管部门通知，科目四考试系统全面更新。模拟考试下不能修改答案，每做一题，系统自动计算错误题数，及格标准为90分，共50题，每题2分，考试时间45分钟。'
      }
    }
  },
  methods: {
    loadTest() {
      this.dialogVisible = false
      if (this.status !== 'init') {
        this.load = false
        setTimeout(() => {
          this.load = true
        }, 10)
      }
      this.isStart = true
      setTimeout(() => {
        this.status = 'init'
      }, 1000)
    },
    testPass() {
      this.status = 'pass'
      this.dialogVisible = true
    }
  },
  computed: {
    text() {
      switch (this.status) {
        case 'pass':
          return '恭喜你，通过了科目一考试。'
        case 'fail':
          return '考试未通过'
      }
      return this.hintText[this.getSubject]
    },
    buttonText() {
      if (this.status === 'init') {
        return '确定'
      }
      return '再答一次'
    },
    getSubject() {
      return this.$store.state.subject
    }
  },

  watch: {
    status(status) {
      if (status !== 'init') {
        this.isStart = true
      }
    },
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

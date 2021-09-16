<template>
  <div class="box" v-if="finalQuestionList[0] !== undefined">
    <div class="row1">
      <div class="col1">
        <fieldset class="border">
          <legend class="title">理论考试</legend>
          <span>1号考台</span>
        </fieldset>
        <fieldset class="border person_info">
          <legend class="title">考生信息</legend>
          <div class="person_img">考生照片</div>
          <div style="color:red">科目一</div>
          <div class="info">考生姓名：XXX</div>
          <div class="info">考试题数：100</div>
          <div class="info">考试时间：45分钟</div>
          <div class="info">满分100分，90分及格</div>
        </fieldset>
      </div>
      <div class="col2">
        <fieldset class="border question">
          <legend class="title">考试题目</legend>
          <p>{{ currentIndex + 1 + '、' + currentItem.question }}</p>
          <p
            v-for="(item, index) in currentItem.optionList"
            :key="index"
            class="option"
          >
            {{ item }}
          </p>
          <AnswerTip
            class="tip"
            :res="answerTip"
            v-show="isChecked"
          ></AnswerTip>
          <Chooser
            :questionType="questionType"
            class="chooser"
            @commit="checkAnswer"
            v-show="!isChecked"
          ></Chooser>
        </fieldset>
      </div>
      <div class="col3">
        <ButtonList
          :length="count"
          :currentIndex="currentIndex"
          :wrongIndex="wrongIndex"
          :rightIndex="rightIndex"
          @buttonClicked="changeQuestion"
        ></ButtonList>
      </div>
    </div>
    <div class="row2">
      <div class="col1">
        <fieldset class="border">
          <legend class="title">剩余时间</legend>
          <Timer
            :setTime="testTime"
            @timerEnd="timeEnd"
            class="timer"
            :isStart="isStart"
          ></Timer>
        </fieldset>
      </div>
      <div class="col2">
        <fieldset class="border">
          <legend class="info_title">提示信息</legend>
          {{ info }}
        </fieldset>
      </div>
      <div class="col3">
        <button @click="prevQuestion">上一题</button>
        <button @click="nextQuestion">下一题</button>
        <button>交卷</button>
      </div>
    </div>
    <div class="row3">
      <fieldset class="border pic">
        <legend class="title">图片信息</legend>
        <img :src="currentItem.pic" alt="" />
      </fieldset>
    </div>
  </div>
</template>
<script>
import ButtonList from './ButtonList.vue'
import Chooser from './Chooser.vue'
import Timer from './Timer.vue'
import AnswerTip from './AnswerTip.vue'
import { getQuestionList } from '@/network/request.js'
import { getQuestionType, getNormalContent } from '@/utils/utils.js'
export default {
  props: {
    isStart: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      count: 100,
      finalQuestionList: [],
      currentIndex: 0,
      wrongIndex: NaN,
      rightIndex: NaN,
      wrongList: [],
      wrongCount: 0,
      rightList: [],
      userAnswer: {},
      testTime: 45 * 60e3,
      info: '判断题，请判断对错！'
    }
  },
  components: { ButtonList, Chooser, Timer, AnswerTip },
  computed: {
    isChecked() {
      if (this.wrongList.concat(this.rightList).includes(this.currentIndex)) {
        return true
      }
      return false
    },
    currentItem() {
      return this.finalQuestionList[this.currentIndex]
    },
    getType() {
      return this.$store.state.type
    },
    getSubject() {
      return this.$store.state.subject
    },
    questionType() {
      return getQuestionType(this.finalQuestionList[this.currentIndex])
    },
    answerTip() {
      const res = {}
      if (this.userAnswer[this.currentIndex] === this.currentItem.answer) {
        res.judge = true
      } else {
        res.judge = false
      }
      res.userAnswer = this.userAnswer[this.currentIndex]
      res.trueAnswer = this.currentItem.answer
      return res
    },
    score() {
      const points = {
        1: 1,
        4: 2
      }
      let score = 100
      console.log(this.wrongCount, points[this.getSubject])
      score -= this.wrongCount * points[this.getSubject]
      console.log(score)
      return score
    }
  },
  watch: {
    getSubject: async function() {
      await this.getFinalQuestionList()
      this.count = this.finalQuestionList.length
    },
    // 根据题型更新提示信息
    currentIndex() {
      switch (this.questionType) {
        case 'choice':
          this.info = '选择题，请选出你认为正确的答案！'
          break
        case 'm-choice':
          this.info = '多选题,请选择所有你认为正确的选项！'
          break
        case 'judge':
          this.info = '判断题，请判断对错！'
          break
      }
    },
    wrongIndex(wrongIndex) {
      this.wrongList.push(wrongIndex)
      this.wrongCount++
    },
    rightIndex(rightIndex) {
      this.rightList.push(rightIndex)
    },
    score(score) {
      console.log(score)
      if (score < 90) {
        this.testFailed()
      }
    }
  },
  methods: {
    testFailed() {
      this.$emit('testFailed')
    },
    testPass() {
      this.$emit('testPass', this.score)
    },
    getAnswerText(answer) {
      const choiceList = ['A', 'B', 'C', 'D']
      let answerStr = ''
      const judgeList = ['对', '错']
      if (this.questionType === 'judge') {
        return judgeList[answer[0]]
      } else {
        for (const value of answer) {
          answerStr += choiceList[value]
        }
        return answerStr
      }
    },
    checkAnswer(answer) {
      answer = this.getAnswerText(answer)
      if (answer !== this.currentItem.answer) {
        this.wrongIndex = this.currentIndex
      } else {
        this.rightIndex = this.currentIndex
      }
      this.userAnswer[this.currentIndex] = answer
      this.nextQuestion()
    },
    nextQuestion() {
      this.currentIndex++
    },
    prevQuestion() {
      this.currentIndex--
    },
    timeEnd() {
      alert('考试结束')
    },
    changeQuestion(index) {
      this.currentIndex = parseInt(index)
    },
    async getFinalQuestionList() {
      const choiceQuestionList = []
      const judgeQuestionList = []
      const multiChoiceQuestionList = []
      let res = {}
      let pagenum = 1
      const questionCount = {
        1: {
          judge: 40,
          choice: 60,
          multiChoice: 0
        },
        4: {
          judge: 20,
          choice: 20,
          multiChoice: 10
        }
      }
      while (
        choiceQuestionList.length < questionCount[this.getSubject].choice ||
        judgeQuestionList.length < questionCount[this.getSubject].judge ||
        multiChoiceQuestionList.length <
          questionCount[this.getSubject].multiChoice
      ) {
        res = await getQuestionList(
          `&type=${this.getType}&subject=${
            this.getSubject
          }&pagenum=${pagenum++}&pagesize=100&sort=random`
        )
        console.log(res)
        res.list.forEach(item => {
          const questionType = getQuestionType(item)
          switch (questionType) {
            case 'judge':
              if (
                judgeQuestionList.length < questionCount[this.getSubject].judge
              ) {
                judgeQuestionList.push(getNormalContent(item))
              }
              break
            case 'choice':
              if (
                choiceQuestionList.length <
                questionCount[this.getSubject].choice
              ) {
                choiceQuestionList.push(getNormalContent(item))
              }
              break
            case 'm-choice':
              if (
                multiChoiceQuestionList.length <
                questionCount[this.getSubject].multiChoice
              ) {
                multiChoiceQuestionList.push(getNormalContent(item))
              }
              break
          }
        })
      }
      this.finalQuestionList = judgeQuestionList
        .concat(choiceQuestionList)
        .concat(multiChoiceQuestionList)
      this.count = this.finalQuestionList.length
      console.log(this.finalQuestionList)
    }
  },
  created() {
    this.getFinalQuestionList()
  }
}
</script>
<style lang="less" scoped>
.person_img {
  height: 134px;
  width: 108px;
  border: 1px solid black;
  margin: 10px auto;
  line-height: 134px;
}

.box {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.row1 {
  display: flex;
  .col1 {
    display: flex;
    flex-direction: column;
    .person_info {
      flex: 1;
    }
  }
  .col2 {
    width: 60%;
    .question {
      height: 360px;
      text-align: left;
      position: relative;
      .chooser {
        position: absolute;
        right: 20px;
        bottom: 20px;
      }
      .tip {
        position: absolute;
        left: 20px;
        bottom: 20px;
      }
    }
    .option {
      margin-left: 20px;
    }
  }
  .col3 {
    flex: 1;
    width: 24%;
    padding: 20px 5px;
  }
}
.row2 {
  display: flex;
  .col1 {
    width: 16%;
    .timer {
      color: red;
      font-size: 16px;
    }
  }
  .col2 {
    width: 60%;
    text-align: left;
  }
  .col3 {
    display: flex;
    justify-content: center;
    flex: 1;
    margin-top: 20px;
    button {
      height: 34px;
      margin: 10px;
    }
  }
}
.border {
  border-radius: 4px;
  margin-top: 20px;
}
.info_title {
  text-align: left;
  color: blue;
  font-size: 16px;
}
.title {
  text-align: left;
  color: red;
}
.info {
  text-align: left;
  line-height: 1.5em;
}
.pic {
  height: 200px;
  img {
    height: 100%;
  }
}
</style>

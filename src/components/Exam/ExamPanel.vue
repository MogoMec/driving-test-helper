<template>
  <div class="box">
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
          <Chooser
            :questionType="questionType"
            class="chooser"
            @commit="checkAnswer"
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
          <Timer :setTime="testTime" @timerEnd="timeEnd" class="timer"></Timer>
        </fieldset>
      </div>
      <div class="col2">
        <fieldset class="border">
          <legend class="info_title">提示信息</legend>
          {{ info }}
        </fieldset>
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
import { getQuestionList } from '@/network/request.js'
import { getQuestionType, getNormalContent } from '@/utils/utils.js'
export default {
  data() {
    return {
      count: 100,
      finalQuestonList: [],
      currentIndex: 0,
      wrongIndex: 1,
      rightIndex: 2,
      testTime: 45 * 60e3,
      info: '判断题，请判断对错！'
    }
  },
  components: { ButtonList, Chooser, Timer },
  computed: {
    currentItem() {
      return this.finalQuestonList[this.currentIndex]
    },
    getType() {
      return this.$store.state.type
    },
    getSubject() {
      return this.$store.state.subject
    },
    questionType() {
      return getQuestionType(this.finalQuestonList[this.currentIndex])
    }
  },
  watch: {
    getSubject: async function() {
      await this.getFinalQuestionList()
      this.count = this.finalQuestonList.length
    },
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
    }
  },
  methods: {
    checkAnswer(answer) {
      console.log(answer)
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
      // console.log(
      //   `&type=${this.getType}&subject=${
      //     this.getSubject
      //   }&pagenum=${pagenum++}&pagesize=200&sort=random`
      // )
      while (
        (this.getSubject === 1 && choiceQuestionList.length < 60) ||
        judgeQuestionList.length < 40
      ) {
        res = await getQuestionList(
          `&type=${this.getType}&subject=${
            this.getSubject
          }&pagenum=${pagenum++}&pagesize=100&sort=random`
        )
        console.log(res)
        res.list.forEach(item => {
          const questionType = getQuestionType(item)
          if (this.getSubject === '1') {
            if (questionType === 'choice' && choiceQuestionList.length < 60) {
              choiceQuestionList.push(getNormalContent(item))
            } else if (judgeQuestionList.length < 40) {
              judgeQuestionList.push(getNormalContent(item))
            }
          } else {
            if (questionType === 'choice') {
              choiceQuestionList.push(getNormalContent(item))
            } else if (questionType === 'm-choice') {
              multiChoiceQuestionList.push(getNormalContent(item))
            } else {
              judgeQuestionList.push(getNormalContent(item))
            }
          }
        })
      }
      this.finalQuestonList = judgeQuestionList.concat(choiceQuestionList)
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

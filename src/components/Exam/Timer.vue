<template>
  <div class="timer_container">
    <div>{{ countdownHour }}:{{ countdownMinute }}:{{ countdownSecond }}</div>
  </div>
</template>
<script>
export default {
  props: {
    setTime: {
      type: Number,
      default: 6000
    },
    isStart: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      now: NaN,
      time: NaN
    }
  },
  computed: {
    finishTime() {
      return Date.now() + this.time
    },
    countdown() {
      return Math.max(0, this.finishTime - this.now)
    },
    // 时
    countdownHour() {
      // padStart用于补位（补0）
      return String.prototype.padStart.call(
        (this.countdown / 3.6e6) | 0,
        2,
        '0'
      )
    },
    // 分
    countdownMinute() {
      return String.prototype.padStart.call(
        ((this.countdown % 3.6e6) / 6e4) | 0,
        2,
        '0'
      )
    },
    // 秒
    countdownSecond() {
      return String.prototype.padStart.call(
        ((this.countdown % 6e4) / 1e3) | 0,
        2,
        '0'
      )
    }
  },
  methods: {
    start() {
      if (this.isStart) {
        // 递归调用定时器实现计时
        this.time = this.setTime
        this.now = Date.now()
        const update = () => {
          setTimeout(() => {
            update()
            this.now = Date.now()
          }, 1e3)
        }
        update()
      }
    }
  },
  watch: {
    countdown(countdown) {
      if (countdown === 0) {
        this.$emit('timerEnd')
      }
    },
    isStart(isStart) {
      this.start()
    }
  },
  created() {
    this.start()
  }
}
</script>

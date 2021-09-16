<template>
  <div class="list_container">
    <ul class="button_list" @click="clickButton">
      <li v-for="(item, index) in array" :key="index" :class="item">
        <div :data-index="index">{{ index + 1 }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      array: [],
      wrongList: [],
      rightList: []
    }
  },
  props: {
    length: Number,
    currentIndex: Number,
    wrongIndex: Number,
    rightIndex: Number
  },
  methods: {
    clickButton(e) {
      const index = e.target.dataset.index
        ? e.target.dataset.index
        : e.target.childNodes[0].dataset.index
      this.$emit('buttonClicked', index)
    },
    initArray() {
      const arr = []
      for (let i = 0; i < this.length; i++) {
        arr.push('normal')
      }
      arr[this.currentIndex] = 'current'
      return arr
    }
  },
  watch: {
    currentIndex: function(newIndex, oldIndex) {
      this.$set(this.array, newIndex, 'current')
      this.$set(this.array, oldIndex, 'normal')
      console.log(oldIndex)
      if (this.wrongList.includes(oldIndex)) {
        console.log('wrong')
        this.$set(this.array, oldIndex, 'wrong')
      } else if (this.rightList.includes(oldIndex)) {
        console.log('right')
        this.$set(this.array, oldIndex, 'right')
      }
    },
    wrongIndex: function(newIndex) {
      this.$set(this.array, newIndex, 'wrong')
      this.wrongList.push(newIndex)
    },
    rightIndex: function(newIndex) {
      this.$set(this.array, newIndex, 'right')
      this.rightList.push(newIndex)
    },
    length: function() {
      this.array = this.initArray()
    }
  },
  // computed: {
  //   array() {
  //     const arr = new Array(this.length)
  //     arr[currentIndex]
  //     return Array.from(arr)
  //   }
  // },
  created() {
    this.array = this.initArray()
  }
}
</script>
<style lang="less" scoped>
.current {
  background-color: #1d6bd0;
  div {
    color: white;
  }
}
.wrong {
  background-color: red;
  div {
    color: white;
  }
}
.right {
  background-color: green;
  div {
    color: white;
  }
}
.list_container {
  height: 100%;
}
.button_list {
  height: 100%;
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  li {
    display: flex;
    float: left;
    width: 10%;
    height: 10%;
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    overflow: hidden;
    cursor: pointer;
    div {
      margin: auto;
    }
  }
}
</style>

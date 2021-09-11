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
      array: []
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
      console.log(index)
    },
    initArray() {
      const arr = []
      for (let i = 0; i < this.length; i++) {
        arr.push('normal')
      }
      arr[this.currentIndex] = 'current'
      console.log(arr)
      return arr
    }
  },
  watch: {
    currentIndex: function(newIndex, oldIndex) {
      this.$set(this.array, newIndex, 'current')
      this.array[oldIndex] = 'normal'
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

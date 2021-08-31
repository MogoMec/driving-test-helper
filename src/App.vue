<template>
  <div id="app">
    <div class="menu">
      <el-dropdown class="type" @command="selectType">
        <el-button type="primary">
          考试类型：{{ this.$store.state.type }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in types"
            :key="index"
            :command="item"
          >
            {{ item }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tooltip class="item" effect="dark" placement="bottom">
        <span class="type-help">？</span>
        <div slot="content">
          多行信息
          <br />
          第二行信息
        </div>
      </el-tooltip>
      <el-dropdown class="subject" @command="selectSubject">
        <el-button type="primary">
          科目{{ this.$store.state.subject === '1' ? '一' : '四' }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in subjects"
            :key="index"
            :command="item"
          >
            {{ item === '1' ? '科目一' : '科目四' }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-menu
        default-active="list"
        class="el-menu-demo"
        mode="horizontal"
        router
      >
        <el-menu-item index="list">题目列表</el-menu-item>
        <el-menu-item index="practice">练习模式</el-menu-item>
        <el-menu-item index="test">模拟考试</el-menu-item>
        <el-menu-item>
          <a href="https://122.gov.cn/m/index/" target="_blank">
            交管12123
          </a>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      subjects: ['1', '4'],
      types: ['A1', 'A2', 'A3', 'B1', 'B2', 'C1', 'C2', 'C3', 'D', 'E', 'F']
    }
  },
  methods: {
    selectSubject(command) {
      this.$store.commit('setSubject', command)
    },
    selectType(command) {
      this.$store.commit('setType', command)
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-menu-demo {
  display: flex;
  justify-content: center;
  li {
    padding: 0 50px;
  }
}
.main {
  margin-top: 20px;
}
.subject {
  padding: 10px 20px;
  margin-left: 50px;
}
.type {
  padding: 10px 20px;
}
.type-help {
  display: inline-block;
  font-size: 26px;
  font-weight: bold;
  vertical-align: middle;
}
</style>

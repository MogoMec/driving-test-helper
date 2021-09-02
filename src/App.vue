<template>
  <div id="app">
    <div class="menu">
      <!-- 驾考车型、考试科目选择 -->
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
      <!-- 类型提示 -->
      <el-tooltip class="item" effect="dark" placement="bottom">
        <img
          src="https://img.icons8.com/color/48/000000/help--v1.png"
          class="type-help"
        />
        <div slot="content">
          A1: 大型客车
          <br />
          A2：牵引车
          <br />
          A3：城市公交车
          <br />
          B1：中型客车
          <br />
          B2：大型货车
          <br />
          C1：小型汽车
          <br />
          C2: 小型自动挡汽车
          <br />
          C3：低速载货汽车
          <br />
          D：普通三轮摩托车
          <br />
          E：普通二轮摩托车
          <br />
          F：轻便摩托车
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
      <!-- 功能菜单 -->
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
    <!-- 内容主体区域 -->
    <div class="main">
      <router-view />
    </div>
    <div class="footer"></div>
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
  height: 30px;
  display: inline-block;
  font-size: 26px;
  font-weight: bold;
  vertical-align: middle;
}
.footer {
  height: 100px;
}
</style>

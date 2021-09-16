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
        <svg
          class="type-help"
          t="1631107286850"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2969"
          width="24"
          height="24"
        >
          <path
            d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
            fill="#2D90E6"
            p-id="2970"
          ></path>
          <path
            d="M533.942857 636.342857c0-14.628571-7.314286-29.257143-7.314286-51.2 0-14.628571 7.314286-29.257143 14.628572-36.571428 7.314286-14.628571 21.942857-36.571429 43.885714-51.2 21.942857-21.942857 43.885714-43.885714 58.514286-65.828572 7.314286-14.628571 7.314286-36.571429 7.314286-51.2 0-29.257143-14.628571-58.514286-36.571429-80.457143-29.257143-21.942857-58.514286-29.257143-95.085714-29.257143-43.885714 0-80.457143 7.314286-109.714286 29.257143V365.714286c21.942857-29.257143 58.514286-43.885714 102.4-43.885715 21.942857 0 36.571429 7.314286 58.514286 14.628572 7.314286 14.628571 14.628571 36.571429 14.628571 51.2 0 14.628571 0 21.942857-7.314286 36.571428-14.628571 21.942857-29.257143 43.885714-51.2 58.514286-14.628571 14.628571-36.571429 36.571429-51.2 58.514286 0 14.628571-7.314286 29.257143-7.314285 43.885714 0 14.628571 0 36.571429 7.314285 51.2h58.514286z m-51.2 131.657143c7.314286 7.314286 21.942857 14.628571 29.257143 14.628571 7.314286 0 21.942857-7.314286 29.257143-14.628571 14.628571-14.628571 14.628571-36.571429 0-58.514286-14.628571-14.628571-43.885714-14.628571-58.514286 0-14.628571 14.628571-14.628571 43.885714 0 58.514286z"
            fill="#FFFFFF"
            p-id="2971"
          ></path>
        </svg>
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
        :default-active="currentView"
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
      types: ['A1', 'A2', 'A3', 'B1', 'B2', 'C1', 'C2', 'C3', 'D', 'E', 'F'],
      currentView: ''
    }
  },
  methods: {
    selectSubject(command) {
      this.$store.commit('setSubject', command)
    },
    selectType(command) {
      this.$store.commit('setType', command)
    }
  },
  mounted() {
    this.currentView = this.$route.path.slice(1)
  }
}
</script>
<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  z-index: 999;
}
.menu {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: #fff;
}
.el-menu-demo {
  display: flex;
  justify-content: center;
  li {
    padding: 0 50px;
  }
}
.main {
  margin-top: 141px;
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

import Vue from 'vue'
import VueRouter from 'vue-router'
import ListView from '@/views/ListView.vue'
import PracticeView from '@/views/PracticeView.vue'
import ExamView from '@/views/ExamView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'list' },
  { path: '/list', component: ListView },
  { path: '/practice', component: PracticeView },
  { path: '/test', component: ExamView }
]

const router = new VueRouter({
  routes
})

export default router

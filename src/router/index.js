import Vue from 'vue'
import VueRouter from 'vue-router'
const ListView = () => import('@/views/ListView.vue')
// const PracticeView = () => import('@/views/PracticeView.vue')
const ExamView = () => import('@/views/ExamView.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'list' },
  { path: '/list', component: ListView },
  // { path: '/practice', component: PracticeView },
  { path: '/test', component: ExamView }
]

const router = new VueRouter({
  routes
})

export default router

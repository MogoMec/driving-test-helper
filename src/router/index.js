import Vue from 'vue'
import VueRouter from 'vue-router'
import ListView from '@/views/ListView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'list' },
  { path: '/list', component: ListView }
]

const router = new VueRouter({
  routes
})

export default router

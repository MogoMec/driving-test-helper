import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '@/components/List/List.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'list' },
  { path: '/list', component: List }
]

const router = new VueRouter({
  routes
})

export default router

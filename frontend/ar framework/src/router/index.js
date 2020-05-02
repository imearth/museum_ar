import Vue from 'vue'
import VueRouter from 'vue-router'
import TargetCreate from '../components/TargetCreate.vue'
import QuizCreate from '../components/QuizCreate.vue'
import VideoUpload from '../components/VideoUpload.vue'
import Position from '../components/Position.vue'
import Chart from '../components/Chart.vue'
import Manual from '../components/ViewManual.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: 'manual',
    name: 'manual',
    component: Manual
  },
  {
    path: '/ch',
    name: 'ch',
    component: Chart
  },
  {
    path: '/po',
    name: 'po',
    component: Position
  },
  {
    path: '/up',
    name: 'up',
    component: VideoUpload
  },
  {
    path: '/',
    name: 'Home',
    component: TargetCreate
  },
{
    path: '/createtarget',
    name: 'TargetCreate',
    component: TargetCreate
  },
  {
    path: '/createquiz',
    name: 'QuizCreate',
    component: QuizCreate
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

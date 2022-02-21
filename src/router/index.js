import { createRouter, createWebHashHistory } from 'vue-router'
import StartPage from '../views/StartPage.vue'
import InstructionPage from '../views/InstructionPage.vue'

const routes = [
  {
    path: '/',
    name: 'Start',
    component: StartPage
  },
  {
    path: '/instructionPage',
    name: 'InstructionPage',
    component: InstructionPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

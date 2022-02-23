import { createRouter, createWebHistory } from "vue-router"
import StartPage from "../views/StartPage.vue"
import InstructionPage from "../views/InstructionPage.vue"
import QuestionPage from '../views/QuestionPage.vue'
import AnswerPage from "../views/AnswerPage.vue"
import ConfirmAnswerPage from '../views/ConfirmAnswerPage.vue'
import EndPage from '../views/EndPage.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: "/",
    name: "Start",
    component: StartPage,
  },
  {
    path: "/instructionPage",
    name: "InstructionPage",
    component: InstructionPage,
  },
  {
    path: "/questionPage",
    name: "QuestionPage",
    component: QuestionPage,
  },
  {
    path: "/answerPage",
    name: "AnswerPage",
    component: AnswerPage,
  },
  {
    path: "/confirmAnswerPage",
    name: "ConfirmAnswerPage",
    component: ConfirmAnswerPage,
  },
  {
    path: '/endPage',
    name: 'EndPage',
    component: EndPage
  },
  {
    path: '/:pathMatch(.*)',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router

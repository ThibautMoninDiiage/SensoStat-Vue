import { createRouter, createWebHistory } from "vue-router"
import AllowMicrophone from '../views/AllowMicrophone.vue'
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
    name: "AllowMicrophone",
    component: AllowMicrophone,
  },
  {
    path: "/startPage",
    name: "StartPage",
    component: StartPage,
  },
  {
    path: "/instructionPage/:position",
    name: "InstructionPage",
    component: InstructionPage,
  },
  {
    path: "/questionPage/:position",
    name: "QuestionPage",
    component: QuestionPage,
  },
  {
    path: "/answerPage/:position",
    name: "AnswerPage",
    component: AnswerPage,
  },
  {
    path: "/confirmAnswerPage/:position/:responseUser",
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

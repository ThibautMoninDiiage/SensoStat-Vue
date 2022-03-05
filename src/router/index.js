import { createRouter, createWebHistory } from "vue-router"
import AllowMicrophone from '../views/AllowMicrophone.vue'
import StartPage from "../views/StartPage.vue"
import InstructionPage from "../views/InstructionPage.vue"
import QuestionPage from '../views/QuestionPage.vue'
import AnswerPage from "../views/AnswerPage.vue"
import ConfirmAnswerPage from '../views/ConfirmAnswerPage.vue'
import EndPage from '../views/EndPage.vue'
import NotFound from '../components/NotFound.vue'
import NotAllowed from '../components/NotAllowed.vue'

const routes = [
    {
        path: "/",
        name: "AllowMicrophone",
        component: AllowMicrophone
    },
    {
        path: "/startPage",
        name: "StartPage",
        component: StartPage
    },
    {
        path: "/instructionPage/:position",
        name: "InstructionPage",
        component: InstructionPage
    },
    {
        path: "/questionPage/:position",
        name: "QuestionPage",
        component: QuestionPage
    },
    {
        path: "/answerPage/:position",
        name: "AnswerPage",
        component: AnswerPage
    },
    {
        path: "/confirmAnswerPage/:position/:responseUser",
        name: "ConfirmAnswerPage",
        component: ConfirmAnswerPage
    },
    {
        path: '/endPage',
        name: 'EndPage',
        component: EndPage
    },
    {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/notAllowed',
        name: 'NotAllowed',
        component: NotAllowed
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    if (to.name == 'EndPage' && from.name !== 'ConfirmAnswerPage') {
        next({name : 'NotAllowed'})
    } else {
        next()
    }
})

export default router

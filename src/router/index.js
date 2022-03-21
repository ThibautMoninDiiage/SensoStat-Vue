import { createRouter, createWebHistory } from "vue-router"
import AllowMicrophone from '../views/AllowMicrophone.vue'
import WelcomePage from "../views/WelcomePage.vue"
import InstructionPage from "../views/InstructionPage.vue"
import AnswerPage from "../views/AnswerPage.vue"
import ConfirmAnswerPage from '../views/ConfirmAnswerPage.vue'
import EndPage from '../views/EndPage.vue'
import NotFound from '../components/NotFound.vue'
import NotAllowed from '../components/NotAllowed.vue'

const routes = [
    {
        path: "/:token",
        name: "AllowMicrophone",
        component: AllowMicrophone
    },
    {
        path: "/welcomePage/:position",
        name: "WelcomePage",
        component: WelcomePage
    },
    {
        path: "/instructionPage/:position",
        name: "InstructionPage",
        component: InstructionPage
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

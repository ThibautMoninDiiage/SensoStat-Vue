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
        component: AllowMicrophone,
        meta : { routeName : "allowMicrophone" }
    },
    {
        path: "/welcomePage",
        name: "WelcomePage",
        component: WelcomePage,
        meta : { routeName : "welcomePage" }
    },
    {
        path: "/instructionPage",
        name: "InstructionPage",
        component: InstructionPage,
        meta : { routeName : "instructionPage" }
    },
    {
        path: "/answerPage",
        name: "AnswerPage",
        component: AnswerPage,
        meta : { routeName : "answerPage" }
    },
    {
        path: "/confirmAnswerPage",
        name: "ConfirmAnswerPage",
        component: ConfirmAnswerPage,
        meta : { routeName : "confirmAnswerPage" }
    },
    {
        path: '/endPage',
        name: 'EndPage',
        component: EndPage,
        meta : { routeName : "endPage" }
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

// Logic path : AllowMicrophone -> WelcomePage -> InstructionPage -> AnswerPage -> ConfirmAnswerPage -> EndPage
router.beforeEach(async (to, from, next) => {
    if (to.name == 'EndPage' && from.name !== 'ConfirmAnswerPage') {
        next({name : 'NotAllowed'})
    } else {
        next()
    }
})

router.afterEach(() => {
    router.go(1)
})

export default router

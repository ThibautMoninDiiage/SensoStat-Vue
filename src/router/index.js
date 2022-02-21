import { createRouter, createWebHashHistory } from "vue-router";
import StartPage from "../views/StartPage.vue";
import InstructionPage from "../views/InstructionPage.vue";
import AnswerPage from "../views/AnswerPage.vue";

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
    path: "/answerPage",
    name: "AnswerPage",
    component: AnswerPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import Huf from "../components/huf/Huf.vue";
import Corporate from "../components/corporate/Corporate.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Huf,
  },
  {
    path: "/corporate",
    name: "Corporate",
    component: Corporate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

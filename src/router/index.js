import { createRouter, createWebHistory } from "vue-router";
import Huf from "../components/huf/Huf.vue";
import Corporate from "../components/corporate/Corporate.vue";
import Partnership from "../components/partnership/Partnership.vue";
import SealPage from "../components/SealPage.vue";

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
  {
    path: "/partnership",
    name: "Partnership",
    component: Partnership,
  },
  {
    path: "/seal",
    name: "Seal",
    component: SealPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

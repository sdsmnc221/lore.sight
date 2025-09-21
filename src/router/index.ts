import { createRouter, createWebHistory } from "vue-router";

import Start from "../views/Start.vue";
import Browser from "../views/Browser.vue";

const routes = [
  {
    path: "/",
    name: "Start",
    component: Start,
  },
  {
    path: "/browser",
    name: "Browser",
    component: Browser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;

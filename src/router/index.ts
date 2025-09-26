import { createRouter, createWebHistory } from "vue-router";

import Start from "../views/Start.vue";
import Browser from "../views/Browser.vue";
import Player from "../views/Player.vue";

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
  {
    path: "/player/:id",
    name: "Player",
    component: Player,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

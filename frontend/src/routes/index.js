import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/login.vue";
import Home from "../views/home.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;

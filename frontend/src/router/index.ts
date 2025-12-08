import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Splash",
    component: () => import("../pages/SplashPage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../pages/RegisterPage.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../pages/ProfilePage.vue"),
  },
  {
    path: "/army-roster",
    name: "ArmyRoster",
    component: () => import("../pages/RosterPage.vue"),
  },
  {
    path: "/army-builder",
    name: "ArmyBuilder",
    component: () => import("../pages/BuilderPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

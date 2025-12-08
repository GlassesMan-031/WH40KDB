import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import SplashPage from "../pages/SplashPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import ArmyRosterPage from "../pages/RosterPage.vue";
import ArmyBuilderPage from "../pages/BuilderPage.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Splash", component: SplashPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/register", name: "Register", component: RegisterPage },
  { path: "/profile", name: "Profile", component: ProfilePage },
  { path: "/army-roster", name: "ArmyRoster", component: ArmyRosterPage },
  { path: "/army-builder", name: "ArmyBuilder", component: ArmyBuilderPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

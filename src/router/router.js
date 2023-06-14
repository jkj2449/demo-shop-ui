import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/view/Home.vue");
const SignIn = () => import("@/view/SignIn.vue");

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/signIn", name: "SignIn", component: SignIn },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

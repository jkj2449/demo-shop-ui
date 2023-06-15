import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/view/Home.vue");
const SignIn = () => import("@/view/SignIn.vue");
const SignUp = () => import("@/view/SignUp.vue");

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/signIn", name: "SignIn", component: SignIn },
  { path: "/signUp", name: "SignUp", component: SignUp },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

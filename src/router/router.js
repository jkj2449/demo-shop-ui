import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/view/Home.vue");
const SignIn = () => import("@/view/SignIn.vue");
const SignUp = () => import("@/view/SignUp.vue");
const Cart = () => import("@/view/Cart.vue");
const Order = () => import("@/view/Order.vue");

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/signIn", name: "SignIn", component: SignIn },
  { path: "/signUp", name: "SignUp", component: SignUp },
  { path: "/cart/:userId", name: "Cart", component: Cart },
  { path: "/order", name: "Order", component: Order },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

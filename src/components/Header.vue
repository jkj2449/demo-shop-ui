<template>
  <header data-bs-theme="dark">
    <div class="collapse text-bg-dark" id="navbarHeader">
      <div class="container">
        <div class="row">
          <div class="col-sm-4 py-4">
            <h4>사이트맵</h4>
            <ul class="list-unstyled">
              <li>
                <router-link
                  :to="{ name: 'SignUp' }"
                  class="text-white"
                  v-if="!$store.state.authStore.user.id"
                >
                  회원가입
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'SignIn' }"
                  class="text-white"
                  v-if="!$store.state.authStore.user.id"
                >
                  로그인
                </router-link>
                <a href="#" class="text-white" v-else @click="signOut()">
                  로그아웃
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container">
        <router-link
          :to="{ name: 'Home' }"
          class="navbar-brand d-flex align-items-center"
        >
          <strong>Home</strong>
        </router-link>
        <router-link
          :to="{
            name: 'Cart',
            params: { userId: $store.state.authStore.user.id || 0 },
          }"
          class="cart btn"
        >
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarHeader"
          aria-controls="navbarHeader"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { useStore } from "vuex";
import router from "@/router/router";

export default {
  setup() {
    const store = useStore();

    const signOut = () => {
      store.dispatch("authStore/setAuthorization", null);
      store.dispatch("authStore/setUser", {});
      router.push({ name: "Home" });
    };

    return { signOut };
  },
};
</script>
<style>
header .navbar .cart {
  margin-left: auto;
  color: #ffff;
}
</style>

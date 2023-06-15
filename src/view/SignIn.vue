<template>
  <div class="form-signin w-100 m-auto">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input
        type="email"
        class="form-control"
        id="floatingInput"
        placeholder="name@example.com"
        v-model="state.form.email"
      />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
        v-model="state.form.password"
      />
      <label for="floatingPassword">Password</label>
    </div>

    <div class="form-check text-start my-3">
      <input
        class="form-check-input"
        type="checkbox"
        value="remember-me"
        id="flexCheckDefault"
      />
      <label class="form-check-label" for="flexCheckDefault">
        Remember me
      </label>
    </div>
    <button class="btn btn-primary w-100 py-2" @click="signIn()">
      Sign in
    </button>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import router from "@/router/router";
import api from "@/api/auth";

export default {
  setup() {
    const state = reactive({
      form: {
        email: "",
        password: "",
      },
    });

    const store = useStore();

    const signIn = async () => {
      const res = await api.signIn(state.form);

      sessionStorage.setItem("user", JSON.stringify(res.data));

      store.dispatch("authStore/setUser", res.data);
      router.push({ name: "Home" });
    };

    return { state, signIn };
  },
};
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

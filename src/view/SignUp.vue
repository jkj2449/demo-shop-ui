<template>
  <div class="container">
    <div class="py-5 text-center">
      <h2>SignUp form</h2>
    </div>

    <div class="row g-5">
      <div class="col-md-7 col-lg-8">
        <div class="row g-3">
          <div class="col-12">
            <label for="username" class="form-label">User name</label>
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="User name"
              v-model="state.form.username"
              required
            />
            <div class="invalid-feedback">Valid first name is required.</div>
          </div>

          <div class="col-12">
            <label for="email" class="form-label"
              >Email <span class="text-body-secondary"></span
            ></label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="you@example.com"
              v-model="state.form.email"
              required
            />
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div class="col-12">
            <label for="password" class="form-label">Password</label>
            <input
              type="Password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="state.form.password"
              required
            />
            <div class="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>

          <div class="col-12">
            <label for="passwordConfirm" class="form-label"
              >Password Confirm
            </label>
            <input
              type="password"
              class="form-control"
              id="passwordConfirm"
              placeholder="Password Confirm"
              v-model="state.form.passwordConfirm"
              required
            />
          </div>
        </div>

        <hr class="my-4" />
        <button class="w-100 btn btn-primary btn-lg" @click="signUp()">
          SignUp
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import router from "@/router/router";
import api from "@/api/auth";

export default {
  setup() {
    const state = reactive({
      form: {
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
      },
    });

    const signUp = async () => {
      await api.signUp(state.form);
      router.push({ name: "SignIn" });
    };

    return { state, signUp };
  },
};
</script>

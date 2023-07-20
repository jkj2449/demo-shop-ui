<template>
  <div class="order">
    <div class="container">
      <main>
        <div class="py-5 text-center">
          <h2>주문하기</h2>
        </div>
        <div class="row g-5">
          <div class="col-md-5 col-lg-4 order-md-last">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-primary">구입 목록</span>
              <span class="badge bg-primary rounded-pill">
                {{ state.items.length }}
              </span>
            </h4>
            <ul class="list-group mb-3">
              <li
                class="list-group-item d-flex justify-content-between lh-sm"
                v-for="(item, idx) in state.items"
                :key="idx"
              >
                <div>
                  <h6 class="my-0">{{ item.name }}</h6>
                </div>
                <span class="text-muted">
                  {{ $utils.numberWithCommas(item.price || 0) }} 원
                </span>
              </li>
            </ul>
            <h3 class="text-center total-price">
              결제 금액: {{ $utils.numberWithCommas(totalPirce || 0) }}
            </h3>
          </div>
          <div class="col-md-7 col-lg-8">
            <h4 class="mb-3">주문자 정보</h4>
            <div class="needs-validation" novalidate="">
              <div class="row g-3">
                <div class="col-12">
                  <label for="username" class="form-label">이름</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    :disabled="true"
                    :value="$store.state.authStore.user.username"
                  />
                </div>
                <div class="col-12">
                  <label for="address" class="form-label">주소</label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    v-model="state.payForm.address"
                  />
                </div>
              </div>
              <hr class="my-4" />
              <h4 class="mb-3">결제 수단</h4>
              <div class="my-3">
                <div
                  class="form-check"
                  v-for="(code, idx) in state.payTypeCode"
                  :key="idx"
                >
                  <input
                    :id="`${idx}`"
                    type="radio"
                    class="form-check-input"
                    :value="code.code"
                    v-model="state.payForm.payTypeCode"
                  />
                  <label class="form-check-label" :for="idx">
                    {{ code.name }}
                  </label>
                </div>
              </div>
              <div class="my-3" v-if="state.payForm.payTypeCode === '01'">
                <div
                  class="form-check"
                  v-for="(code, idx) in state.cardCode"
                  :key="idx"
                >
                  <input
                    :id="`${idx}`"
                    type="radio"
                    class="form-check-input"
                    :value="code.code"
                    v-model="state.payForm.cardCode"
                  />
                  <label class="form-check-label" :for="idx">
                    {{ code.name }}
                  </label>
                </div>
              </div>
              <div v-if="state.payForm.payTypeCode === '01'">
                <label for="cc-name" class="form-label">카드 번호</label>
                <input
                  type="text"
                  maxlength="16"
                  class="form-control"
                  id="cc-name"
                  v-model="state.payForm.cardNumber"
                />
              </div>
              <div class="my-3" v-if="state.payForm.payTypeCode === '02'">
                <div
                  class="form-check"
                  v-for="(code, idx) in state.bankCode"
                  :key="idx"
                >
                  <input
                    :id="`${idx}`"
                    type="radio"
                    class="form-check-input"
                    :value="code.code"
                    v-model="state.payForm.bankCode"
                  />
                  <label class="form-check-label" :for="idx">
                    {{ code.name }}
                  </label>
                </div>
              </div>
              <hr class="my-4" />
              <button class="w-100 btn btn-primary btn-lg" @click="submit()">
                결제하기
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onBeforeMount, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import api from "@/api/order";

const store = useStore();
const router = useRouter();

onBeforeMount(() => {
  const items = store.getters["orderStore/getItems"] || [];
  if (items.length < 1) {
    router.push("/");
  }
});

const state = reactive({
  carts: store.getters["orderStore/getCarts"] || [],
  items: store.getters["orderStore/getItems"] || [],
  payTypeCode: store.getters["codeStore/getCodesByName"]("PayTypeCode") || [],
  bankCode: store.getters["codeStore/getCodesByName"]("BankCode") || [],
  cardCode: store.getters["codeStore/getCodesByName"]("CardCode") || [],
  payForm: {
    memberId: store.state.authStore.user.id,
    address: "",
    bankCode: "",
    cardCode: "",
    payTypeCode: "",
    cardNumber: "",
  },
});

watch(
  () => state.payForm.payTypeCode,
  () => {
    if (state.payForm.payTypeCode === "01") {
      state.payForm.bankCode = "";
      return;
    }

    state.payForm.cardNumber = "";
    state.payForm.cardCode = "";
  }
);

watch(
  () => state.payForm.cardNumber,
  () => {
    state.payForm.cardNumber = state.payForm.cardNumber.replace(/[^0-9]/g, "");
  }
);

const submit = async () => {
  const payload = {
    orderDetailList: createOderDetailList(),
    ...state.payForm,
  };

  await api.order(payload);
  store.dispatch("orderStore/setCarts", []);

  router.push({
    name: "MyOrder",
    params: { userId: store.state.authStore.user.id },
  });
};

const createOderDetailList = () => {
  return state.carts.map((cart) => {
    return {
      cartId: cart.id,
      itemId: cart.item.id,
      price: cart.item.price,
    };
  });
};

const totalPirce = computed(() => {
  return state.items.map((v) => v.price).reduce((a, b) => a + b, 0);
});
</script>

<style scoped></style>

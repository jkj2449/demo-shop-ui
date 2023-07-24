<template>
  <div class="card shadow-sm">
    <span
      class="img"
      :style="{ backgroundImage: `url(${props.item.imagePath})` }"
    ></span>
    <div class="card-body">
      <p class="card-text">{{ props.item.name }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group" v-if="$store.state.authStore.user.id">
          <button
            class="btn btn-sm btn-outline-secondary"
            @click="addToCart(item.id)"
          >
            장비구니
          </button>
          <button
            class="btn btn-sm btn-outline-secondary"
            @click="moveToOrder(item)"
          >
            구매하기
          </button>
        </div>
        <small class="text-muted">
          {{ $utils.numberWithCommas(props.item.price || 0) }} 원
        </small>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/api/cart";
import store from "@/store/store";
import router from "@/router/router";
import { defineProps } from "vue";
import { useToast } from "vue-toastification";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const addToCart = async (itemId) => {
  try {
    await api.addCart({
      itemId: itemId,
      memberId: store.state.authStore.user.id,
    });

    useToast().success("장바구니에 담겼습니다.", {
      timeout: 1000,
    });
  } catch (error) {
    console.log(error);
  }
};

const moveToOrder = (item) => {
  store.dispatch("orderStore/setItems", [item]);
  router.push({ name: "Order" });
};
</script>

<style>
.card .img {
  display: inline-block;
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
}
</style>

<template>
  <div class="card shadow-sm">
    <span
      class="img"
      :style="{ backgroundImage: `url(${props.item.imagePath})` }"
    ></span>
    <div class="card-body">
      <p class="card-text">{{ props.item.name }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <template v-if="$store.state.authStore.user.id">
          <button class="btn btn-primary" @click="addToCart(item.id)">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
        </template>
        <small class="text-muted">
          {{ util.numberWithCommas(props.item.price || 0) }} 원
        </small>
      </div>
    </div>
  </div>
</template>

<script setup>
import util from "@/util/util";
import api from "@/api/cart";
import store from "@/store/store";
import { defineProps } from "vue";

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
  } catch (error) {
    console.log(error);
  }
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

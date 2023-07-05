<template>
  <div class="cart" v-if="state.carts.length > 0">
    <div class="container">
      <ul>
        <li v-for="(cart, idx) in state.carts" :key="idx">
          <img :src="cart.item.imagePath" />
          <span class="name">{{ cart.item.name }}</span>
          <span class="price">
            {{ util.numberWithCommas(cart.item.price || 0) }} 원
          </span>
          <input type="checkbox" :value="cart" v-model="state.checkedCart" />
        </li>
      </ul>
    </div>
    <BasicPagination
      :pageCount="state.page.totalPages"
      :page-range="1"
      @pageSelected="pageChangeHandler"
    />
    <div class="col-lg-6 mx-auto">
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
        <router-link
          :to="{ name: 'Order' }"
          class="btn btn-primary btn-lg px-4 me-sm-3"
        >
          구매하기
        </router-link>
        <button
          type="button"
          class="btn btn-outline-secondary btn-lg px-4"
          @click="remove()"
        >
          비우기
        </button>
      </div>
    </div>
  </div>
  <div v-else><h1>장바구니가 비어 있습니다.</h1></div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/api/cart";
import util from "@/util/util";

const state = reactive({
  carts: [],
  page: {
    totalPages: 0,
  },
  checkedCart: [],
});

const route = useRoute();

onMounted(() => {
  findCarts({ page: 1, size: 3 });
});

const findCarts = async (payload) => {
  try {
    const res = await api.findCarts({
      memberId: route.params.userId,
      ...payload,
    });
    state.carts = res.data.content;
    state.page.totalPages = res.data.totalPages;
  } catch (error) {
    console.log(error);
  }
};

const remove = async () => {
  if (state.checkedCart.length == 0) {
    return;
  }

  try {
    const cartIdList = state.checkedCart.map((v) => v.id);
    await api.deleteCarts({ cartIdList: cartIdList });
    state.checkedCart = [];
    findCarts({ page: 1, size: 3 });
  } catch (error) {
    console.log(error);
  }
};

const pageChangeHandler = (page) => {
  findCarts({ page: page, size: 3 });
};
</script>

<style scoped>
.cart ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.cart ul li {
  border: 1px solid #eee;
  margin-top: 25px;
  margin-bottom: 25px;
}
.cart ul li img {
  width: 150px;
  height: 150px;
}
.cart ul li .name {
  margin-left: 25px;
}
.cart ul li .price {
  margin-left: 25px;
}
.cart ul li input {
  float: right;
  font-size: 20px;
  margin-top: 40px;
  margin-right: 50px;
  zoom: 1.5;
}
.cart .btn {
  width: 300px;
  display: block;
  margin: 0 auto;
  padding: 30px 50px;
  font-size: 20px;
}
</style>

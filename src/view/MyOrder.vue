<template>
  <div class="orders">
    <div class="container">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>번호</th>
            <th>주문자명</th>
            <th>주소</th>
            <th>결제 수단</th>
            <th>구입 항목</th>
            <th>주문 상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(o, idx) in state.orders" :key="idx">
            <td>{{ o.id }}</td>
            <td>{{ $store.state.authStore.user.username }}</td>
            <td>{{ o.address }}</td>
            <td>
              {{ $utils.findNameByCode(state.payTypeCode, o.payTypeCode) }}
            </td>
            <td>
              <div v-for="(i, idx) in o.orderDetailList" :key="idx">
                {{ i.name }}
              </div>
            </td>
            <td>
              {{
                $utils.findNameByCode(state.orderStatusCode, o.orderStatusCode)
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { reactive, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import api from "@/api/order";

const store = useStore();
const route = useRoute();

const state = reactive({
  orderStatusCode:
    store.getters["codeStore/getCodesByName"]("OrderStatusCode") || [],
  payTypeCode: store.getters["codeStore/getCodesByName"]("PayTypeCode") || [],
  bankCode: store.getters["codeStore/getCodesByName"]("BankCode") || [],
  cardCode: store.getters["codeStore/getCodesByName"]("CardCode") || [],
  orders: [],
});

onBeforeMount(() => {
  findOrders({ page: 1, size: 3 });
});

const findOrders = async (payload) => {
  try {
    const res = await api.findOrders({
      memberId: route.params.userId,
      ...payload,
    });
    state.orders = res.data.content;
    state.page.totalPages = res.data.totalPages;
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>

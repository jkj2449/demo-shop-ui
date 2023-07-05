<template>
  <main>
    <div class="album py-5 bg-body-tertiary">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="(item, idx) in state.items" :key="idx">
            <Card :item="item"></Card>
          </div>
        </div>
        <BasicPagination
          :pageCount="state.page.totalPages"
          :page-range="1"
          @pageSelected="pageChangeHandler"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import api from "@/api/item";
import Card from "@/components/item/Card.vue";
import { reactive, onMounted } from "vue";

const state = reactive({
  items: [],
  page: {
    totalPages: 0,
  },
});

onMounted(() => {
  findItems({ page: 1, size: 10 });
});

const findItems = async (page) => {
  try {
    const res = await api.findItems(page);
    state.items = res.data.content;
    state.page.totalPages = res.data.totalPages;
  } catch (error) {
    console.log(error);
  }
};

const pageChangeHandler = (page) => {
  findItems({ page: page, size: 10 });
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>

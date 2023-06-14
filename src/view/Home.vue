<template>
  <main>
    <div class="album py-5 bg-body-tertiary">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="(item, idx) in state.items" :key="idx">
            <Card :item="item"></Card>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import api from "@/api/item";
import Card from "@/components/item/Card.vue";
import { reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      items: [],
    });

    // (async () => {
    //   const res = await api.findItems();
    //   state.items = res.data;
    // })();

    api.findItems().then(({ data }) => {
      state.items = data;
      console.log(data);
    });

    return { state };
  },
  components: { Card },
};
</script>

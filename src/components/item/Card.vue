<template>
  <div class="card shadow-sm">
    <span
      class="img"
      :style="{ backgroundImage: `url(${item.imagePath})` }"
    ></span>
    <div class="card-body">
      <p class="card-text">{{ item.name }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <button class="btn btn-primary">구입하기</button>
        <small class="text-muted">
          {{ util.numberWithCommas(item.price) }} 원
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";

export default {
  props: {
    item: Object,
  },
  setup() {
    return { util };
  },
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

export default {
  numberWithCommas(v) {
    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
};

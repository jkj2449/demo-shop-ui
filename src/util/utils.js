export default {
  numberWithCommas: (v) => {
    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  findNameByCode: (codes, code) => {
    return codes.find((v) => v.code === code).name;
  },
};

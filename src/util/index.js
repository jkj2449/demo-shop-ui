import utils from "./utils";

export default {
  install(Vue) {
    Vue.config.globalProperties.$utils = utils;
  },
};

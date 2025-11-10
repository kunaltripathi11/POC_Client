import mutations from "./mutation";
import getters from "./getters";
import actions from "./actions";

export default {
  namespaced: true,
  state() {
    return {
      solCategories: [],
      error: "",
    };
  },
  mutations,
  actions,
  getters,
};

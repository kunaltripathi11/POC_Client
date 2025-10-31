import mutations from "./mutation";
import getters from "./getters";
import actions from "./actions";

export default {
	namespaced: true,
	state() {
		return {
			models: [],
		};
	},
	mutations,
	actions,
	getters,
};

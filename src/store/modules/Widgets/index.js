import mutations from "./mutation";
import getters from "./getters";
import actions from "./actions";

export default {
	namespaced: true,
	state() {
		return {
			widget: [],
			allWidget: [],
			dashboard_id: null,
		};
	},
	mutations,
	actions,
	getters,
};

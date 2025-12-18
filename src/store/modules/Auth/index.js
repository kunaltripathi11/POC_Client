import mutations from "./mutation";
import getters from "./getters";
import actions from "./actions";

export default {
	namespaced: true,

	state: () => ({
		user: null,
		isAuthenticated: false,
		loading: false,
		error: null,
	}),
	mutations,
	actions,
	getters,
};

export default {
	namespaced: true,
	state() {
		return {
			currentPage: 1,
			perPage: 10,
		};
	},
	mutations: {
		Set_Page(state, page) {
			state.currentPage = page;
		},
		Set_PerPage(state, num) {
			state.perPage = num;
		},
	},
	actions: {
		UPDATE_PAGE({ commit }, page) {
			commit("Set_Page", page);
		},
		UPDATE_PER_PAGE({ commit }, num) {
			commit("Set_PerPage", num);
		},
	},

	getters: {
		getCurrentPage(state) {
			return state.currentPage;
		},
		getPerPage(state) {
			return state.perPage;
		},
	},
};

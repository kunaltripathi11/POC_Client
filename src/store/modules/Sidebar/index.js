export default {
	namespaced: true,
	state() {
		return {
			collapsed: false,
			headerCollapse: false,
		};
	},
	mutations: {
		SET_COLLAPSED(state, data) {
			state.collapsed = data;
		},
		TOGGLE_SIDEBAR(state) {
			state.collapsed = !state.collapsed;
		},
		SET_HEADER_COLLAPSE(state, data) {
			state.headerCollapse = data;
		},
	},
	actions: {
		toggleSidebar({ commit }) {
			commit("TOGGLE_SIDEBAR");
		},
		setCollapsed({ commit }, val) {
			commit("SET_COLLAPSED", val);
		},
		setHeaderCollapsed({ commit }, val) {
			commit("SET_HEADER_COLLAPSE", val);
		},
	},

	getters: {
		isCollapsed(state) {
			return state.collapsed;
		},
		isHeaderCollapse(state) {
			return state.headerCollapse;
		},
	},
};

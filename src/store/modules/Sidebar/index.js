import { API_URL } from "../../../config";

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
			console.log("COLLLLLLLLLLLL", state.collapsed);
			state.collapsed = !state.collapsed;
			console.log("COddddddddddddddd", state.collapsed);
		},
		SET_HEADER_COLLAPSE(state, data) {
			state.headerCollapse = data;
		},
	},
	actions: {
		toggleSidebar({ commit }) {
			console.log("HEY HEY");
			commit("TOGGLE_SIDEBAR");
		},
		setCollapsed({ commit }, val) {
			console.log("VAL", val);
			commit("SET_COLLAPSED", val);
		},
		setHeaderCollapsed({ commit }, val) {
			commit("SET_HEADER_COLLAPSE", val);
		},
	},

	getters: {
		isCollapsed(state) {
			console.log("CPKDD", state.collapsed);
			return state.collapsed;
		},
		isHeaderCollapse(state) {
			return state.headerCollapse;
		},
	},
};

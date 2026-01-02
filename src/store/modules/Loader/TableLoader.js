export default {
	namespaced: true,

	state: () => ({
		tables: {},
	}),

	mutations: {
		START_TABLE_LOADING(state, key) {
			state.tables[key] = true;
		},
		STOP_TABLE_LOADING(state, key) {
			state.tables[key] = false;
		},
		RESET_TABLE_LOADING(state, key) {
			delete state.tables[key];
		},
	},

	getters: {
		isTableLoading: (state) => (key) => {
			return !!state.tables[key];
		},
	},
};

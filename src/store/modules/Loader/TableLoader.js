export default {
	namespaced: true,

	state: () => ({
		tables: {},
	}),

	mutations: {
		START_TABLE_LOADING(state, key) {
			console.log("Start");
			state.tables[key] = true;
		},
		STOP_TABLE_LOADING(state, key) {
			console.log("Stop");
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

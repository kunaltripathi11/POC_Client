export default {
	namespaced: true,
	state: () => ({
		loading: false,
		startTime: 0,
		minDuration: 1000,
	}),
	mutations: {
		START_LOADING(state) {
			state.startTime = Date.now();

			state.loading = true;
		},

		STOP_LOADING(state) {
			if (state.loadingCount > 0) return;

			const elapsed = Date.now() - state.startTime;
			const remaining = state.minDuration - elapsed;

			if (remaining > 0) {
				setTimeout(() => {
					state.loading = false;
				}, remaining);
			} else {
				state.loading = false;
			}
		},

		RESET_LOADING(state) {
			state.loading = false;
			state.startTime = 0;
		},
	},
	getters: {
		isLoading: (state) => state.loading,
	},
};

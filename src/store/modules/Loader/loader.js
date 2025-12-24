export default {
	namespaced: true,
	state: () => ({
		loading: false,
		loadingCount: 0,
		startTime: 0,
		minDuration: 1000,
		isTableLoading: false,
	}),
	mutations: {
		START_LOADING(state) {
			state.startTime = Date.now();

			state.loadingCount++;
			state.loading = true;
		},

		STOP_LOADING(state) {
			state.loadingCount = Math.max(0, state.loadingCount - 1);

			if (state.loadingCount > 0) return;

			const elapsed = Date.now() - state.startTime;
			const remaining = state.minDuration - elapsed;

			if (remaining > 0) {
				setTimeout(() => {
					state.loading = false;
					console.log("Load stop", state.loading);
				}, remaining);
			} else {
				state.loading = false;
			}
		},

		RESET_LOADING(state) {
			state.loading = false;
			state.loadingCount = 0;
			state.startTime = 0;
		},
	},
	getters: {
		isLoading: (state) => state.loading,
	},
};

export default {
	SET_LOADING(state, value) {
		state.loading = value;
	},
	SET_USER(state, user) {
		state.user = user;
		state.isAuthenticated = true;
	},
	LOGOUT(state) {
		state.user = null;
		state.isAuthenticated = false;
	},
	SET_ERROR(state, error) {
		state.error = error;
	},
};

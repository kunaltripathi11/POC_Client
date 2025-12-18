export default {
	SET_LOADING(state, value) {
		state.loading = value;
	},
	SET_USER(state, user) {
		state.user = user;
		console.log("user", user);
		state.isAuthenticated = true;
		console.log(" state.isAuthenticated", state.isAuthenticated);
	},
	LOGOUT(state) {
		console.log("hey");
		state.user = null;
		state.isAuthenticated = false;
	},
	SET_ERROR(state, error) {
		state.error = error;
	},
};

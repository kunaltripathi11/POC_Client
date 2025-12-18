export default {
	isAuthenticated: (state) => state.isAuthenticated,
	user: (state) => state.user,
	Name(state) {
		return state.user?.name;
	},
	role: (state) => state.user?.role,
};

export default {
	setRules(state, data) {
		state.rules = data;
	},

	setArchivedRules(state, data) {
		state.archivedRules = data;
	},

	SET_ERROR(state, error) {
		state.error = error;
	},

	setOneRule(state, data) {
		state.ruleById = data;
	},
};

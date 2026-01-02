export default {
	setRules(state, data) {
		state.rules = data;
	},

	setArchivedRules(state, data) {
		state.archivedRules = data;
	},

	setOneRule(state, data) {
		state.ruleById = data;
	},
};

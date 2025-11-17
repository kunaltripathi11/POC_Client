export default {
  filteredRules(state) {
    let filtered = state.rules;
    console.log(filtered);
    return filtered;
  },

  getError: (state) => state.error,
};

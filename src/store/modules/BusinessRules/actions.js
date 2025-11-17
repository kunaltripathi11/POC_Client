export default {
  async fetchRules({ commit }) {
    try {
      const response = await fetch(
        "http://localhost:3000/admin/business-rules"
      );
      const json = await response.json();

      commit("setRules", json.data);
    } catch (err) {
      console.error("Error loading Business Rules", err);
    }
  },
  // editCategory(cat) {
  // 	this.$router.push(`/admin/application/categories/${dash.uuid}`);
  // },
  async deleteRule({ dispatch }, uuid) {
    if (!confirm("Sure? This will Delete the Rule.")) return;
    await fetch(`http://localhost:3000/admin/business-rules/${uuid}`, {
      method: "DELETE",
    });
    await dispatch("fetchRules");
  },

  async createBusinessRule({ commit }, payload) {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/business-rules/add-business-rules`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      commit("SET_ERROR", null);
      return data.rule;
    } catch (error) {
      commit("SET_ERROR", error.message);
      throw error;
    }
  },
};

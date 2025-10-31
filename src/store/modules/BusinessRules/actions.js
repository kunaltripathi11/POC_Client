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
		if (!confirm("Sure? This will Delete the Category.")) return;
		await fetch(`http://localhost:3000/admin/business-rules/${uuid}`, {
			method: "DELETE",
		});
		await dispatch("fetchRules");
	},
};

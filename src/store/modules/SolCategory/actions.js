export default {
	async fetchSolCategory({ commit }) {
		try {
			const response = await fetch(
				"http://localhost:3000/admin/application/solution-categories"
			);
			const json = await response.json();

			commit("setSolCategories", json.data);
		} catch (err) {
			console.error("Error loading Solution Category", err);
		}
	},
	// editSolCategory(cat) {
	// 	this.$router.push(`/admin/application/categories/${dash.uuid}`);
	// },
	async deleteSolCategory({ dispatch }, uuid) {
		if (!confirm("Sure? This will hide the Category.")) return;
		await fetch(
			`http://localhost:3000/admin/application/solution-categories/${uuid}`,
			{
				method: "DELETE",
			}
		);
		await dispatch("fetchSolCategory");
	},
};

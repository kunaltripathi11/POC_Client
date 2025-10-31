export default {
	async fetchModels({ commit }, url) {
		try {
			const response = await fetch(url);
			const json = await response.json();

			commit("setModel", json.data);
		} catch (err) {
			console.error("Error loading Data Models", err);
		}
	},
	// editCategory(cat) {
	// 	this.$router.push(`/admin/application/categories/${dash.uuid}`);
	// },
	async deleteModel({ dispatch }, uuid) {
		if (!confirm("Sure? This will Delete the Category.")) return;
		await fetch(`http://localhost:3000/admin/data-model/${uuid}}`, {
			method: "DELETE",
		});
		await dispatch("fetchModels", url);
	},
};

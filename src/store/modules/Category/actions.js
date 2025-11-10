export default {
	async fetchCategory({ commit }) {
		try {
			const response = await fetch(
				"http://localhost:3000/admin/application/categories"
			);
			const json = await response.json();

			commit("setCategories", json.data);
		} catch (err) {
			console.error("Error loading Category", err);
		}
	},

	async createCategory({ dispatch }, payload) {
		try {
			const response = await fetch(
				"http://localhost:3000/admin/application/categories/add",
				{
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(payload),
				}
			);

			if (!response.ok) {
				throw new Error("Error Inserting Data");
			}
			dispatch("fetchCategory");
		} catch (err) {
			console.error("Error loading Category", err);
		}
	},

	// editCategory(cat) {
	// 	this.$router.push(`/admin/application/categories/${dash.uuid}`);
	// },
	async deleteCategory({ dispatch }, uuid) {
		if (!confirm("Sure? This will Delete the Category.")) return;
		await fetch(
			`http://localhost:3000/admin/application/categories/${uuid}`,
			{
				method: "DELETE",
			}
		);
		await dispatch("fetchCategory");
	},
};

export default {
	async fetchApplications({ commit }) {
		try {
			const response = await fetch(
				"http://localhost:3000/admin/application/apps"
			);
			const json = await response.json();
			commit("setApplication", json.data);
		} catch (err) {
			console.error("Error loading Application", err);
		}
	},
	// editApplication(app) {
	// 	console.log(app);
	// 	this.$router.push(`/admin/application/apps/edit/${dash.uuid}`);
	// },
	async deleteApplication({ dispatch }, uuid) {
		if (!confirm("Sure? This will delete the Application.")) return;
		await fetch(
			`http://localhost:3000/admin/application/apps/edit/${uuid}`,
			{
				method: "DELETE",
			}
		);
		await dispatch("fetchApplications");
	},
};

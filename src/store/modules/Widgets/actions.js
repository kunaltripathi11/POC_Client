export default {
	async addWighetAction({ commit }, widgetData) {
		try {
			const response = fetch("http://localhost:3000/admin/widget/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(widgetData),
			});

			if (!response.ok) {
				throw new Error("Failed to Add");
			} else {
				const saveWidget = await response.json();
				commit("addWidget", saveWidget);
			}
		} catch (error) {
			console.log(error);
		}
	},

	async fetchWidgets({ commit }) {
		try {
			const response = fetch("http://localhost:3000/admin/widget");
		} catch (error) {}
	},
};

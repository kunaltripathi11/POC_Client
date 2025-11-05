export default {
	async addWidgetAction({ commit }, widgetData) {
		try {
			const response = await fetch(
				"http://localhost:3000/admin/widget/add",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(widgetData),
				}
			);

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

	async fetchWidgets({ commit }, id) {
		try {
			const response = await fetch(
				`http://localhost:3000/admin/widget?id=${id}`
			);

			const json = await response.json();

			commit("setWidget", json.data);
		} catch (error) {
			console.log("Error in loading!!!", error);
		}
	},
};

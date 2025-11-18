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
			}
		} catch (error) {
			console.log(error);
		}
	},

	async fetchWidgets({ state, commit }, payload) {
		const { id, variable } = payload;
		state.allWidget = [];
		try {
			const response = await fetch(
				`http://localhost:3000/admin/widget?id=${id}&variable=${variable}`
			);

			const json = await response.json();
			console.log("WidgetsssssW::::;", json.data);
			commit("setWidget", json.data);

			state.dashboard_id = state.allWidget[0].dash_id;
		} catch (error) {
			console.log("Error in loading!!!", error);
		}
	},
};

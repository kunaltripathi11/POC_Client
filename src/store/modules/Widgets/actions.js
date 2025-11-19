export default {
	async addWidgetAction({ state, dispatch }, payload) {
		try {
			const response = await fetch(
				"http://localhost:3000/admin/widget/add",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						dashboard_id: payload.dashboard_id,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to Add");
			}
			dispatch("fetchWidgets", {
				id: payload.id,
				variable: "uuid",
			});
		} catch (error) {
			console.log("Error in add widget", error);
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
			commit("setWidget", json.data);

			state.dashboard_id = json.dashboard_id;
		} catch (error) {
			console.log("Error in loading!!!", error);
		}
	},
};

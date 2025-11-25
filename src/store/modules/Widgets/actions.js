import { API_URL } from "../../../config";

export default {
	async addWidgetAction({ state, dispatch }, payload) {
		try {
			const response = await fetch(`${API_URL}admin/widget/add`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					dashboard_id: payload.dashboard_id,
					widget_type: payload.widget_type,
				}),
			});

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

		console.log("ID", id, variable);

		try {
			const response = await fetch(
				`${API_URL}admin/widget?id=${id}&variable=${variable}`
			);

			const json = await response.json();

			commit("setWidget", json.data);
			console.log("DATA GETTING", json);
			state.dashboard_id = json.dashboard_id;

			state.columns = json.columns;

			console.log("Columns", state.columns);
		} catch (error) {
			console.log("Error in loading!!!", error);
		}
	},

	async removeWidget({ dispatch }, { uuid, dashUUID }) {
		try {
			console.log("Widget", uuid, "DAsh", dashUUID);
			if (!confirm("Sure? This will delete the widget.")) return;
			const response = await fetch(`${API_URL}admin/widget/${uuid}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				console.log("Unable to delete");
			}
			await dispatch("fetchWidgets", {
				id: dashUUID,
				variable: "uuid",
			});
		} catch (error) {
			console.log("ERROR in Deleting", error);
		}
	},
};

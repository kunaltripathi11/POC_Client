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

		try {
			const response = await fetch(
				`${API_URL}admin/widget?id=${id}&variable=${variable}`
			);

			const json = await response.json();

			commit("setWidget", json.data);
			state.dashboard_id = json.dashboard_id;

			state.columns = json.columns;
		} catch (error) {
			console.log("Error in loading!!!", error);
		}
	},

	async updateWidget({ state }, { uuid, payload }) {
		try {
			const response = await fetch(`${API_URL}admin/widget/${uuid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const json = await response.json();

			return { success: true, data: json.data };
		} catch (error) {
			console.log("ERROR IN UPDATING", error);
		}
	},

	async removeWidget({ dispatch }, { uuid, dashUUID }) {
		try {
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

	async model({ state }, payload) {
		try {
			const response = await fetch(`${API_URL}admin/widget/getModel`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			const json = await response.json();
			return { success: true, data: json.data };
		} catch (err) {
			console.log(err);
		}
	},
};

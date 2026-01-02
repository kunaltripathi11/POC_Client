import { API_URL } from "../../../config";
import toastService from "../../../service/toastService";

export default {
	async addWidgetAction({ dispatch }, payload) {
		try {
			const response = await fetch(`${API_URL}admin/widget/add`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					dashboard_id: payload.dashboard_id,
					widget_type: payload.widget_type,
				}),
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Failed to add widget");
			}
			dispatch("fetchWidgets", {
				id: payload.id,
				variable: "uuid",
			});
		} catch (error) {
			toastService.error("Unable to add widget");
			console.log("Error in add widget", error);
		}
	},

	async fetchWidgets({ state, commit }, payload) {
		const { id, variable } = payload;
		commit("TableLoader/START_TABLE_LOADING", `Widget_${id}`, {
			root: true,
		});

		state.allWidget = [];
		try {
			const response = await fetch(
				`${API_URL}admin/widget?id=${id}&variable=${variable}`,
				{ credentials: "include" }
			);

			if (!response.ok) {
				throw new Error("Failed to load widgets");
			}

			const json = await response.json();
			commit("setWidget", json.data);
			state.dashboard_id = json.dashboard_id;
		} catch (error) {
			toastService.error("Failed to load widgets");
			console.log("Error in loading!!!", error);
		} finally {
			setTimeout(() => {
				commit("TableLoader/STOP_TABLE_LOADING", `Widget_${id}`, {
					root: true,
				});
			}, 2000);
		}
	},

	async updateWidget({}, { uuid, payload }) {
		try {
			const response = await fetch(`${API_URL}admin/widget/${uuid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Update failed");
			}

			const json = await response.json();

			toastService.success("Widget updated successfully");

			return { success: true, data: json.data };
		} catch (error) {
			toastService.error("Error updating widget");
			console.log("ERROR IN UPDATING", error);
			return { success: false };
		}
	},

	async removeWidget({ dispatch }, { uuid, id, variable }) {
		try {
			if (!confirm("Sure? This will delete the widget.")) return;
			const response = await fetch(`${API_URL}admin/widget/${uuid}`, {
				method: "DELETE",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ uuid: id }),
			});

			if (!response.ok) {
				throw new Error("Delete failed");
			}

			toastService.success("Widget deleted successfully");

			await dispatch("fetchWidgets", {
				id,
				variable,
			});
		} catch (error) {
			toastService.error("Unable to delete widget");
			console.log("ERROR in Deleting", error);
		}
	},

	async modelByRule({ state }, payload) {
		try {
			const response = await fetch(`${API_URL}admin/widget/getModel`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
				credentials: "include",
			});
			const json = await response.json();
			return { success: true, data: json.data };
		} catch (err) {
			console.log(err);
		}
	},
};

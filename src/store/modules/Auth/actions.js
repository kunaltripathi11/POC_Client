import { API_URL } from "../../../config";
import router from "../../../Route";
import toastService from "../../../service/toastService";

export default {
	async login({ commit }, payload) {
		commit("SET_LOADING", true);
		commit("SET_ERROR", null);

		const { username, password } = payload;
		console.log("PAY", payload);
		try {
			const res = await fetch(`${API_URL}login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || "Login failed");
			}
			console.log("DATA", data);
			toastService.success(
				`Welcome back ${data?.user?.name || username}`
			);

			return true;
		} catch (error) {
			commit("SET_ERROR", error.message);
			toastService.error(error.message || "Invalid credentials");
			return false;
		} finally {
			commit("SET_LOADING", false);
		}
	},

	async fetchUser({ commit }) {
		try {
			const res = await fetch(`${API_URL}me`, {
				credentials: "include",
			});

			if (!res.ok) throw new Error();

			const data = await res.json();

			commit("SET_USER", data.user);
			return { data: data };
		} catch {
			commit("LOGOUT");
		}
	},

	async logout({ commit }) {
		console.log("HEL");
		await fetch(`${API_URL}logout`, {
			method: "POST",
			credentials: "include",
		});
		toastService.success("Logged out successfully");

		commit("LOGOUT");
	},

	async changePassword({ commit }, payload) {
		commit("SET_LOADING", true);
		commit("SET_ERROR", null);

		try {
			const res = await fetch(`${API_URL}change-password`, {
				method: "PUT",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message);
			}

			toastService.success("Password updated successfully");

			return true;
		} catch (error) {
			commit("SET_ERROR", error.message);
			toastService.error(error.message);
			return false;
		} finally {
			commit("SET_LOADING", false);
		}
	},

	async forgotPassword({ commit }, payload) {
		commit("SET_LOADING", true);
		commit("SET_ERROR", null);
		try {
			const res = await fetch(`${API_URL}forgot-password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			}

			toastService.success(
				"If the email exists, a reset link has been sent."
			);

			return true;
		} catch (error) {
			commit("SET_ERROR", error.message);
			toastService.error(error.message);
			return false;
		} finally {
			commit("SET_LOADING", false);
		}
	},

	async resetPassword({ commit }, payload) {
		commit("SET_LOADING", true);
		commit("SET_ERROR", null);
		try {
			const res = await fetch(`${API_URL}reset-password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			}

			toastService.success("Password Updated Successfully");

			return true;
		} catch (error) {
			commit("SET_ERROR", error.message);
			toastService.error(error.message);
			return false;
		} finally {
			commit("SET_LOADING", false);
		}
	},
};

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
			const res = await fetch("http://localhost:3000/login", {
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

			return true;
		} catch (error) {
			commit("SET_ERROR", error.message);
			return false;
		} finally {
			commit("SET_LOADING", false);
		}
	},

	async fetchUser({ commit }) {
		try {
			const res = await fetch("http://localhost:3000/me", {
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
		await fetch("http://localhost:3000/logout", {
			method: "POST",
			credentials: "include",
		});

		commit("LOGOUT");
	},
};

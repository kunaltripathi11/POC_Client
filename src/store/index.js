import { createStore } from "vuex";
import SolCategory from "./modules/SolCategory/index";
import Category from "./modules/Category";
import Application from "./modules/Application";
import DataModel from "./modules/DataModels";
import BusinessRule from "./modules/BusinessRules";
import Dashboard from "./modules/Dashboard";
import Widget from "./modules/Widgets";
import Tags from "./modules/Tags";

import createPresistedState from "vuex-persistedstate";
import Pagination from "./modules/Pagination";
import Sidebar from "./modules/Sidebar";
import Auth from "./modules/Auth";

const store = createStore({
	modules: {
		SolCategory,
		Category,
		Application,
		DataModel,
		BusinessRule,
		Dashboard,
		Widget,
		Tags,
		Pagination,
		Sidebar,
		Auth,
	},
	state() {
		return {
			selected: null,
		};
	},
	mutations: {
		SELECTED(state, data) {
			state.selected = data;
		},
	},
	actions: {
		SET_SELECTED({ commit }, data) {
			commit("SELECTED", data);
		},
	},
	getters: {
		getSelected(state) {
			return state.selected;
		},
	},
	plugins: [
		createPresistedState({
			paths: ["selected"],
		}),
	],
});

export default store;

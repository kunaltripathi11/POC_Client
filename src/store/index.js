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
import Loader from "./modules/Loader/loader";
import TableLoader from "./modules/Loader/TableLoader";

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
		Loader,
		TableLoader,
	},
	state() {
		return {
			DashUUIDForApp: null,
		};
	},
	mutations: {
		SET_DASH_UUID(state, data) {
			state.DashUUIDForApp = data;
		},
	},
	actions: {},
	getters: {
		getDashUUID(state) {
			return state.DashUUIDForApp;
		},
	},
	plugins: [
		createPresistedState({
			paths: ["DashUUIDForApp"],
		}),
	],
});

export default store;

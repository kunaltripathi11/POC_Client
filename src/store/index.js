import { createStore } from "vuex";
import SolCategory from "./modules/SolCategory/index";
import Category from "./modules/Category";
import Application from "./modules/Application";
import DataModel from "./modules/DataModels";
import BusinessRule from "./modules/BusinessRules";
import Dashboard from "./modules/Dashboard";

const store = createStore({
	modules: {
		SolCategory,
		Category,
		Application,
		DataModel,
		BusinessRule,
		Dashboard,
	},
	state() {},
	mutations: {},
	actions: {},
});

export default store;

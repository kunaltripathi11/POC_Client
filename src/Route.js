import { createRouter, createWebHistory } from "vue-router";

import MainContent from "./components/Layout/MainContent.vue";
import Dashboard from "./components/Dashboard/dashboard.vue";
import DataModel from "./components/DataModel/dataModel.vue";
import BusinessRules from "./components/Business Rules/businessRules.vue";
import Filter from "./components/Application/filter.vue";
import Category from "./components/Application/category.vue";
import Application from "./components/Application/application.vue";
import SolCategory from "./components/Application/SolCategory.vue";

import AppLayout from "./components/Home/appLayout.vue";
import ApplicationPage from "./components/Home/ApplicationPage.vue";
import DashboardDesign from "./components/Home/dashboardDesign.vue";
import SolutionCategoryForm from "./components/forms/solutionCategoryForm.vue";
import CategoryForm from "./components/forms/CategoryForm.vue";
import ApplicationForm from "./components/forms/applicationForm.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", component: AppLayout, redirect: "/launchpad" },
		{
			path: "/:url",
			component: ApplicationPage,
			meta: { title: "Application" },
		},
		{
			path: "/launchpad",
			component: AppLayout,
			meta: {
				title: "Launchpad",
			},
		},
		{
			path: "/admin",
			redirect: "/admin/application/apps",
			component: MainContent,
			children: [
				{
					path: "application",
					redirect: "/admin/application/apps",
					component: Filter,
					children: [
						{
							path: "categories",
							component: Category,
							meta: {
								title: "Category",
							},
						},
						{
							path: "solution-categories",
							component: SolCategory,
							meta: {
								title: "Solution Category",
							},
						},
						{
							path: "apps",
							component: Application,
							meta: {
								title: "Application",
							},
						},
					],
				},
				{
					path: "application/solution-categories/add",
					component: SolutionCategoryForm,
				},
				{
					path: "application/apps/add-app",
					component: ApplicationForm,
				},
				{
					path: "application/categories/add",
					component: CategoryForm,
				},
				{
					path: "dashboard",
					component: Dashboard,
					meta: {
						title: "Dashboard",
					},
				},
				{
					path: "dashboard/design/:uuid",
					component: DashboardDesign,
					props: true,
				},
				{
					path: "data-model",
					component: DataModel,
					meta: {
						title: "Data Model",
					},
				},
				{
					path: "business-rules",
					component: BusinessRules,
					meta: {
						title: "Business Rules",
					},
				},
			],
		},
	],
});

router.beforeEach((to, from, next) => {
	if (to.meta && to.meta.title) {
		document.title = to.meta.title;
	} else {
		document.title = "Sofy";
	}
	next();
});

export default router;

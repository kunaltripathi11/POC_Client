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
import DashboardForm from "./components/forms/dashboardForm.vue";
import DataModelsForm from "./components/forms/dataModelsForm.vue";
import BusinessRuleForms from "./components/forms/businessRuleForms.vue";
import BusinessRulePage from "./components/Pages/BusinessRulePage.vue";
import GetRuleOverview from "./components/Business Rules/getRuleOverview.vue";
import EditRule from "./components/Business Rules/EditRule.vue";
import WidgetForm from "./components/forms/WidgetForm.vue";

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
					path: "application/apps/add-app",
					component: ApplicationForm,
				},

				{
					path: "application/apps/edit/:uuid",
					component: ApplicationForm,
				},
				{
					path: "application/solution-categories/add",
					component: SolutionCategoryForm,
				},

				{
					path: "application/solution-categories/:uuid",
					component: SolutionCategoryForm,
				},

				{
					path: "application/categories/add",
					component: CategoryForm,
				},
				{
					path: "application/categories/:uuid",
					component: CategoryForm,
				},

				{
					path: "dashboard/add",
					component: DashboardForm,
				},
				{
					path: "dashboard",
					component: Dashboard,
					meta: {
						title: "Dashboard",
					},
				},
				{
					path: "dashboard/:uuid",
					component: DashboardForm,
					meta: {
						title: "Edit Dashboard",
					},
				},
				{
					path: "dashboard/design/:uuid",
					component: DashboardDesign,
					props: true,
				},
				{
					path: "dashboard/design/:uuid/:uuid2",
					component: WidgetForm,
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
					name: "AddDataModel",
					path: "data-model/add-data-model",
					component: DataModelsForm,
				},
				{
					path: "data-model/:uuid",
					component: DataModelsForm,
				},
				{
					path: "business-rules",
					component: BusinessRules,
					meta: {
						title: "Business Rules",
					},
				},
				{
					path: "business-rules/:uuid",
					component: BusinessRulePage,
					redirect: (to) =>
						`/admin/business-rules/${to.params.uuid}/overview`,
					meta: {
						title: "Business Rules",
					},
					children: [
						{
							path: "overview",
							component: GetRuleOverview,
							meta: {
								title: "Overview",
							},
						},
						{
							path: "edit",
							component: BusinessRuleForms,
						},
					],
				},

				{
					path: "business-rules/add-business-rules",
					component: BusinessRuleForms,
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

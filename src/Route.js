import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("./components/Home/appLayout.vue"),
			redirect: "/launchpad",
			meta: { isAuthReq: true },
		},
		{
			path: "/launchpad",
			component: () => import("./components/Home/appLayout.vue"),
			meta: { title: "Launchpad", isAuthReq: true },
		},
		{
			path: "/:url",
			component: () => import("./components/Home/ApplicationPage.vue"),
			meta: {
				title: "Application",
				isAuthReq: true,
				requiresAppValidation: true,
			},
		},

		{
			path: "/admin",
			component: () => import("./components/Layout/MainContent.vue"),
			redirect: "/admin/application/apps",
			meta: { isAuthReq: true },
			children: [
				{
					path: "application",
					component: () =>
						import("./components/Application/filter.vue"),
					redirect: "/admin/application/apps",
					children: [
						{
							path: "categories",
							component: () =>
								import("./components/Application/category.vue"),
							meta: { title: "Category" },
						},
						{
							path: "solution-categories",
							component: () =>
								import(
									"./components/Application/SolCategory.vue"
								),
							meta: { title: "Solution Category" },
						},
						{
							path: "apps",
							component: () =>
								import(
									"./components/Application/application.vue"
								),
							meta: { title: "Application" },
						},
					],
				},

				{
					path: "application/apps/add-app",
					component: () =>
						import("./components/forms/applicationForm.vue"),
					meta: { title: "Add Application" },
				},
				{
					path: "application/apps/edit/:uuid",
					component: () =>
						import("./components/forms/applicationForm.vue"),
					meta: { title: "Edit Application" },
				},
				{
					path: "application/solution-categories/add",
					component: () =>
						import("./components/forms/solutionCategoryForm.vue"),
					meta: { title: "Add Solution Category" },
				},
				{
					path: "application/solution-categories/:uuid",
					component: () =>
						import("./components/forms/solutionCategoryForm.vue"),
					meta: { title: "Edit Solution Category" },
				},
				{
					path: "application/categories/add",
					component: () =>
						import("./components/forms/CategoryForm.vue"),
					meta: { title: "Add Category" },
				},
				{
					path: "application/categories/:uuid",
					component: () =>
						import("./components/forms/CategoryForm.vue"),
					meta: { title: "Edit Category" },
				},

				{
					path: "dashboard",
					component: () =>
						import("./components/Dashboard/dashboard.vue"),
					meta: { title: "Dashboard" },
				},
				{
					path: "dashboard/add",
					component: () =>
						import("./components/forms/dashboardForm.vue"),
					meta: { title: "Add Dashboard" },
				},
				{
					path: "dashboard/design/:uuid/:uuid2",
					component: () =>
						import("./components/forms/WidgetForm.vue"),
					props: true,
				},
				{
					path: "dashboard/design/:uuid",
					component: () =>
						import("./components/Home/dashboardDesign.vue"),
					props: true,
				},
				{
					path: "dashboard/:uuid",
					component: () =>
						import("./components/forms/dashboardForm.vue"),
					meta: { title: "Edit Dashboard" },
				},

				{
					path: "data-model",
					component: () =>
						import("./components/DataModel/dataModel.vue"),
					meta: { title: "Data Model" },
				},
				{
					name: "AddDataModel",
					path: "data-model/add-data-model",
					component: () =>
						import("./components/forms/dataModelsForm.vue"),
					meta: { title: "Add Data Model" },
				},
				{
					path: "data-model/:uuid",
					component: () =>
						import("./components/Pages/DataModelEditPage.vue"),
					meta: { title: "Edit Data Model" },
				},

				{
					path: "business-rules",
					component: () =>
						import("./components/Business Rules/businessRules.vue"),
					meta: { title: "Business Rules" },
				},
				{
					path: "business-rules/add-business-rules",
					component: () =>
						import("./components/forms/businessRuleForms.vue"),
					meta: { title: "Add Business Rules" },
				},
				{
					path: "business-rules/:uuid",
					component: () =>
						import("./components/Pages/BusinessRulePage.vue"),
					redirect: (to) =>
						`/admin/business-rules/${to.params.uuid}/overview`,
					meta: { title: "Business Rules" },
					children: [
						{
							path: "overview",
							component: () =>
								import(
									"./components/Business Rules/getRuleOverview.vue"
								),
							meta: { title: "Overview" },
						},
						{
							path: "edit",
							component: () =>
								import(
									"./components/forms/businessRuleForms.vue"
								),
							meta: { title: "Edit Business Rules" },
						},
					],
				},
			],
		},

		{
			path: "/login",
			component: () => import("./components/Pages/LoginPage.vue"),
			meta: { title: "Login" },
		},
		{
			path: "/change_password",
			component: () =>
				import("./components/Pages/ChangePasswordPage.vue"),
			meta: { isAuthReq: true, title: "Change Password" },
		},
		{
			path: "/forgot_password",
			component: () => import("./components/Pages/ForgotPassword.vue"),
			meta: { title: "Forgot Password" },
		},
		{
			path: "/reset_password",
			component: () => import("./components/Pages/ResetPassword.vue"),
			meta: { title: "Reset Password" },
		},

		{
			path: "/:pathMatch(.*)*",
			name: "NotFound",
			component: () => import("./components/Pages/NotFound.vue"),
			meta: { title: "Not Found" },
		},
	],
});

router.beforeEach(async (to, from, next) => {
	document.title = to.meta.title || "Sofy";
	store.commit("Loader/START_LOADING");

	store.dispatch("Pagination/UPDATE_PAGE", 1);

	await store.dispatch("Auth/fetchUser");
	const isAuthenticated = store.getters["Auth/isAuthenticated"];

	if (to.meta.isAuthReq && !isAuthenticated) {
		return next("/login");
	}

	if (
		["/login", "/forgot_password", "/reset_password"].includes(to.path) &&
		isAuthenticated
	) {
		return next("/launchpad");
	}

	if (to.meta.requiresAppValidation) {
		if (!store.getters["Application/categorizedApplications"]) {
			await store.dispatch("Application/fetchApplications");
		}

		const validUrls = store.getters["Application/validUrls"];
		if (!validUrls.has(`/${to.params.url}`)) {
			return next({ name: "NotFound" });
		}
	}

	next();
});

router.afterEach(() => {
	store.commit("Loader/STOP_LOADING");
});

export default router;

import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import MainContent from "./components/Layout/MainContent.vue";
import Application from "./components/Application/application.vue";
import Dashboard from "./components/Dashboard/dashboard.vue";
import DataModel from "./components/DataModel/dataModel.vue";
import BusinessRules from "./components/Business Rules/businessRules.vue";
import Category from "./components/Application/category.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [

        { path: '/', redirect: '/launchpad' },
        { path: '/launchpad', component: App },
        {
            path: '/admin', component: MainContent, children: [
                {
                    path: 'application', redirect: '/admin/application/apps', children: [
                        { path: 'categories', component: Category },
                        { path: 'apps', component: Application }
                    ]
                },
                {
                    path: 'dashboard', component: Dashboard
                },
                { path: 'data-model', component: DataModel },
                { path: 'business-rules', component: BusinessRules }

            ]
        }
    ]
})

export default router
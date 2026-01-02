<template>
	<div class="app-layouts" :class="{ collapsed: isCollapsed }">
		<Sidebar />
		<MainContent />
		<main class="content">
			<DashboardMain />
		</main>
	</div>
</template>

<script>
import DashboardMain from "../Dashboard/dashboardMain.vue";
import MainContent from "../Layout/MainContent.vue";
import Sidebar from "../Layout/sidebar.vue";
export default {
	components: {
		MainContent,
		DashboardMain,
		Sidebar,
	},
	computed: {
		isCollapsed() {
			return this.$store.getters["Sidebar/isCollapsed"];
		},
	},
};
</script>

<style scoped>
.app-layouts {
	margin-top: -13rem;
	padding-left: var(--sidebar-width);
	transition: padding-left 0.3s ease;
}
.app-layouts.collapsed {
	--sidebar-width: var(--sidebar-collapsed);
}
</style>

<template>
	<MainContent />
	<div class="main">
		<DashboardMain class="dashboard" />
	</div>
</template>

<script>
import DashboardMain from "../Dashboard/dashboardMain.vue";
import MainContent from "../Layout/MainContent.vue";
export default {
	components: {
		MainContent,
		DashboardMain,
	},
};
</script>

<style scoped>
.main {
	padding: 0 0 0 0;
	margin: -10rem;
	margin-left: 4rem;
	height: calc(100vh - 5rem);
	width: calc(100% - 4rem);
}
.dashboard {
	margin-top: 10rem;
}
</style>

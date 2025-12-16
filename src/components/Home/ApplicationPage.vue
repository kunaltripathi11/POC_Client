<template>
	<MainContent />
	<div class="main">
		<DashboardMain />
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
	margin-right: -10rem;
	height: calc(100vh - 5rem);
	width: calc(100% - 4rem);
}
</style>

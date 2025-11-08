<template>
	<MainContent />
	<div class="container main">
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
	padding: 4rem 0 0 0;
}
</style>

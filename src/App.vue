<template>
	<link
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
		rel="stylesheet"
	/>

	<Header></Header>
	<AppMainLayout></AppMainLayout>
	<router-view></router-view>
</template>

<script>
import AppMainLayout from "./components/Home/appLayout.vue";
import Header from "./components/Layout/header.vue";

export default {
	components: {
		Header,
		AppMainLayout,
	},
};
</script>

<style></style>

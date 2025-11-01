<template>
	<link
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
		rel="stylesheet"
	/>

	<Header></Header>
	<router-view></router-view>
</template>

<script>
import Header from "./components/Layout/header.vue";

export default {
	components: {
		Header,
	
	},
};
</script>

<style></style>

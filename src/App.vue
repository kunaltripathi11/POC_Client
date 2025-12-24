<template>
	<link
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
		rel="stylesheet"
	/>
	<Header v-if="$route.meta.isAuthReq"></Header>

	<div class="app-layouts">
		<router-view />
	</div>
</template>

<script>
import Header from "./components/Layout/header.vue";
import BaseSpinner from "./components/UI/BaseSpinner.vue";

export default {
	components: {
		Header,
		BaseSpinner,
	},
	computed: {
		isLoading() {
			this.$store.getters["Loader/isLoading"];
		},
	},
};
</script>

<style>
:root {
	--header-height: 4rem;
	--sidebar-expanded: 13rem;
	--sidebar-collapsed: 4rem;
	--sidebar-width: var(--sidebar-expanded);
}
.app-layouts {
	padding-top: var(--header-height);
	transition: padding-left 0.3s ease;
}
</style>

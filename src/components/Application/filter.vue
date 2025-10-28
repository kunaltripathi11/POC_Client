<template>
	<router-link
		to="/admin/application"
		@click="setActiveItem('app')"
		:class="{ active: activeItem === 'app' }"
	>
		Application
	</router-link>
	<router-link
		to="/admin/application/categories"
		:class="{ active: activeItem === 'category' }"
		@click="setActiveItem('category')"
	>
		Category
	</router-link>
	<router-link> </router-link>
</template>

<script>
export default {
	data() {
		return {
			activeItem: null,
		};
	},
	methods: {
		setActiveItem(val) {
			this.activeItem = val;
		},
	},
};
</script>

<style scoped>
a,
a:hover {
	text-decoration: none;
	color: rgb(15, 15, 15);
}
.active {
	background: rgb(0, 51, 141) !important;
	color: white !important;
}
</style>

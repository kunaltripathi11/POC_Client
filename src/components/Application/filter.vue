<template>
	<div class="filter container">
		<div class="tabs">
			<router-link
				to="/admin/application"
				class="tab"
				:class="{ active: activeItem === 'app' }"
			>
				Application
			</router-link>

			<router-link
				to="/admin/application/categories"
				class="tab"
				:class="{ active: activeItem === 'category' }"
			>
				Category
			</router-link>
			<router-link
				to="/admin/application/solution-categories"
				class="tab"
				:class="{ active: activeItem === 'solCategory' }"
			>
				Solution Category
			</router-link>
			<div class="spacer"></div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
import Application from "./application.vue";
import Category from "./category.vue";

export default {
	components: {
		Application,
		Category,
	},
	data() {
		return {
			activeItem: null,
			route: this.$router.route,
		};
	},

	mounted() {
		this.checkActive(this.$route);
	},
	methods: {
		setActiveItem(val) {
			this.activeItem = val;
		},
		checkActive(route) {
			if (route.path.includes("/apps")) {
				this.setActiveItem("app");
			} else if (route.path.includes("/categories")) {
				this.setActiveItem("category");
			} else if (route.path.includes("/solution-categories")) {
				this.setActiveItem("solCategory");
			}
		},
	},
	watch: {
		$route(to) {
			this.checkActive(to);
		},
	},
};
</script>

<style scoped>
.filter {
	padding-top: 4rem;
}
.tabs {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
.tab {
	padding: 0.55rem 1rem;
	text-decoration: none;
	color: black;
	background: rgba(0, 0, 0, 0.03);
}
a,
a:hover {
	/* padding: 4rem 10rem; */
	text-decoration: none;
	color: rgb(15, 15, 15);
	/* position: absolute; */
}
.active {
	background: rgb(0, 51, 141) !important;
	color: white !important;
}
.spacer {
	flex: 1;
}
</style>

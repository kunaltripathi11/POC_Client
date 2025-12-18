<template>
	<div class="app-layout" :class="{ collapsed: isCollapsed }">
		<Sidebar v-if="this.$route.path.includes('admin')" />

		<main class="app-contents">
			<RouterView />
		</main>
	</div>
</template>

<script>
import Sidebar from "./sidebar.vue";

export default {
	components: { Sidebar },
	computed: {
		isCollapsed() {
			return this.$store.getters["Sidebar/isCollapsed"];
		},
	},
};
</script>

<style>
.app-layout {
	padding-left: var(--sidebar-width);
	transition: padding-left 0.3s ease;
}

.app-layout.collapsed {
	--sidebar-width: var(--sidebar-collapsed);
}

.sidebar {
	width: var(--sidebar-width);
	transition: width 0.3s ease;
}

@media (max-width: 1000px) {
	.app-layout {
		padding-left: 4rem;
	}
}
</style>

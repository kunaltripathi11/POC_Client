<template>
	<div class="pagination-container">
		<button
			@click="goToPage(getCurrentPage - 1)"
			:disabled="getCurrentPage === 1"
		>
			Prev
		</button>

		<button
			v-for="page in totalPages"
			:key="page"
			@click="goToPage(page)"
			:class="{ activePage: getCurrentPage === page }"
		>
			{{ page }}
		</button>

		<button
			@click="goToPage(getCurrentPage + 1)"
			:disabled="getCurrentPage === totalPages"
		>
			Next
		</button>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	props: {
		totalItems: Number,
	},

	computed: {
		...mapGetters("Pagination", ["getCurrentPage", "getPerPage"]),
		totalPages() {
			return Math.ceil(this.totalItems / this.getPerPage);
		},
	},

	methods: {
		...mapActions("Pagination", ["UPDATE_PAGE"]),
		goToPage(page) {
			this.UPDATE_PAGE(page);
		},
	},
};
</script>

<style scoped>
.pagination-container {
	position: absolute;

	right: 4rem;
}
</style>

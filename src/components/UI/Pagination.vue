<template>
	<div class="pagination-container">
		<button
			@click="goToPage(getCurrentPage - 1)"
			:disabled="getCurrentPage === 1"
		>
			<font-awesome-icon icon="fa-solid fa-angle-left" />
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
			<font-awesome-icon icon="fa-solid fa-angle-right" />
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
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;

	margin-top: 0.3rem;
	margin-bottom: 0.3rem;
}

.pagination-container button {
	border: none;
	padding: 8px 14px;
	background: #f1f1f1;
	color: #333;
	border-radius: 8px;
	cursor: pointer;
	font-size: 14px;
	min-width: 25px;
}

.pagination-container button:hover:not(:disabled) {
	background: #dcdcdc;
}

.pagination-container button:disabled {
	cursor: not-allowed;
	opacity: 0.4;
}

.pagination-container .activePage {
	background: rgb(0, 51, 141);
	color: #fff;
	font-weight: bold;
}
</style>

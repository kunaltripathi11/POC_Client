<template>
	<div class="pagination-container">
		<button @click="$emit('update:page', page - 1)" :disabled="page === 1">
			<font-awesome-icon icon="fa-solid fa-angle-left" />
		</button>

		<button
			v-for="p in totalPages"
			:key="p"
			@click="$emit('update:page', p)"
			:class="{ activePage: page === p }"
		>
			{{ p }}
		</button>

		<button
			@click="$emit('update:page', page + 1)"
			:disabled="page === totalPages"
		>
			<font-awesome-icon icon="fa-solid fa-angle-right" />
		</button>
	</div>
</template>

<script>
export default {
	props: {
		totalItems: { type: Number, required: true },
		page: { type: Number, default: 1 },
		perPage: { type: Number, default: 10 },
	},
	computed: {
		totalPages() {
			return Math.max(1, Math.ceil(this.totalItems / this.perPage));
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

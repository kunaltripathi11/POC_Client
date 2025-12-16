<template>
	<div class="main-content mt-3">
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold mb-2">Category List</h3>
			<router-link to="/admin/application/categories/add">
				<button class="btn btn-primary mb-2" @click="create">
					Create Category
				</button>
			</router-link>
		</div>

		<div class="table-wrapper">
			<table class="table table-hover align-middle shadow-sm">
				<thead class="table-primary">
					<tr>
						<th>ID</th>
						<th>Solution Category</th>
						<th>Category</th>
						<th>Display Order</th>
						<th class="text-center">Actions</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="cat in paginatedCategory" :key="cat.uuid">
						<td>{{ cat.id }}</td>
						<td>{{ cat.title }}</td>
						<td>{{ cat.category_name }}</td>
						<td>{{ cat.display_order }}</td>

						<td class="text-center">
							<base-action
								@delete="deleteCategory(cat.uuid)"
								@edit="editCategory(cat)"
							/>
						</td>
					</tr>

					<tr v-if="category && !category.length">
						<td colspan="6" class="text-center text-muted py-3">
							No Category Available
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div>
			<Pagination
				:total-items="category.length"
				v-if="getPerPage < category.length"
			/>
		</div>
	</div>
</template>

<script>
import BaseAction from "../UI/BaseAction.vue";
import { mapActions, mapGetters } from "vuex";
import Pagination from "../UI/Pagination.vue";

export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters("Category", ["filteredCategory"]),
		...mapGetters("Pagination", ["getCurrentPage", "getPerPage"]),

		category() {
			return this.filteredCategory;
		},
		paginatedCategory() {
			const start = (this.getCurrentPage - 1) * this.getPerPage;
			return this.category.slice(start, start + this.getPerPage);
		},
	},
	async mounted() {
		await this.fetchCategory();
	},
	methods: {
		...mapActions("Category", [
			"fetchCategory",
			"deleteCategory",
			"editCategory",
		]),
	},
	components: {
		BaseAction,
		Pagination,
	},
};
</script>
<style scoped>
.main-content {
	padding: 1rem 1rem 1rem 1rem;
	background: #fff;
	margin: 0 1rem;
	border: 1px solid #e5e7eb;
	border-radius: 10px;

	margin-bottom: 0.2rem;
	max-height: calc(100vh - 9rem);
}

.table-wrapper {
	border-radius: 10px;
	overflow: hidden;
	border: 1px solid #e5e7eb;
	max-height: calc(100vh - 16rem);

	overflow-y: auto;
	border: 1px solid #e5e7eb;
	border-radius: 10px;
}

thead th {
	position: sticky;
	top: 0;
	z-index: 5;
}
</style>

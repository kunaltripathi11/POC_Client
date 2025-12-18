<template>
	<div class="main-content mt-3">
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold mb-2">Category List</h3>
			<div style="display: flex; justify-content: space-between">
				<BaseSearch v-model="searchQuery"></BaseSearch>
				<router-link to="/admin/application/categories/add">
					<button class="btn btn-primary mb-2" @click="create">
						Create Category
					</button>
				</router-link>
			</div>
		</div>

		<div class="table-wrapper">
			<table class="table table-hover align-middle shadow-sm">
				<thead class="table-primary">
					<tr>
						<th @click="sortBy('id')" class="sortable">
							ID
							<span v-if="sortKey === 'id'">
								{{ sortOrder === "asc" ? "▲" : "▼" }}
							</span>
						</th>
						<th @click="sortBy('title')" class="sortable">
							Solution Category
							<span v-if="sortKey === 'title'">
								{{ sortOrder === "asc" ? "▲" : "▼" }}
							</span>
						</th>

						<th @click="sortBy('category_name')" class="sortable">
							Category
							<span v-if="sortKey === 'category_name'">
								{{ sortOrder === "asc" ? "▲" : "▼" }}
							</span>
						</th>

						<th @click="sortBy('display_order')" class="sortable">
							Display Order
							<span v-if="sortKey === 'display_order'">
								{{ sortOrder === "asc" ? "▲" : "▼" }}
							</span>
						</th>

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

					<tr v-if="paginatedCategory && !paginatedCategory.length">
						<td colspan="6" class="text-center text-muted py-3">
							No Category Available
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div>
			<Pagination
				:total-items="filteredCategories.length"
				v-if="getPerPage < filteredCategories.length"
			/>
		</div>
	</div>
</template>

<script>
import BaseAction from "../UI/BaseAction.vue";
import { mapActions, mapGetters } from "vuex";
import Pagination from "../UI/Pagination.vue";
import BaseSearch from "../UI/BaseSearch.vue";
import sortMixin from "../../mixins/sortMixin";

export default {
	data() {
		return { searchQuery: "" };
	},
	mixins: [sortMixin],
	computed: {
		...mapGetters("Category", ["filteredCategory"]),
		...mapGetters("Pagination", ["getCurrentPage", "getPerPage"]),

		category() {
			return this.filteredCategory;
		},
		filteredCategories() {
			if (!this.searchQuery) return this.category;

			const q = this.searchQuery.toLowerCase();

			const a = this.category.filter((cat) =>
				[cat.title, cat.category_name]
					.filter(Boolean)
					.some((val) => String(val).toLowerCase().includes(q))
			);
			return a;
		},
		sortedCategory() {
			return this.sortItems(this.filteredCategories);
		},
		paginatedCategory() {
			const start = (this.getCurrentPage - 1) * this.getPerPage;
			return this.sortedCategory.slice(start, start + this.getPerPage);
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
		BaseSearch,
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
	background-color: #9cc7f5;
}
.sortable {
	cursor: pointer;
	user-select: none;
}

.sortable span {
	font-size: 0.7rem;
	margin-left: 4px;
}
</style>

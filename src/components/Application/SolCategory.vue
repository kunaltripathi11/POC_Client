<template>
	<router-view></router-view>
	<div class="main-content mt-3">
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold mb-2">Solution Category List</h3>
			<div style="display: flex; justify-content: space-between">
				<BaseSearch v-model="searchQuery"></BaseSearch>
				<router-link to="/admin/application/solution-categories/add">
					<button class="btn btn-primary mb-2" @click="create">
						Create Sol
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
						<th>UUID</th>
						<th @click="sortBy('title')" class="sortable">
							Solution Category
							<span v-if="sortKey === 'title'">
								{{ sortOrder === "asc" ? "▲" : "▼" }}
							</span>
						</th>

						<th class="text-center">Actions</th>
					</tr>
				</thead>

				<tbody>
					<TableSkeleton
						v-if="isTableLoading"
						v-for="n in getPerPage"
						:key="'skeleton-' + n"
						:columns="4"
					/>
					<tr v-else v-for="cat in paginatedSolCategory">
						<td>{{ cat.id }}</td>
						<td>{{ cat.uuid }}</td>
						<td>{{ cat.title }}</td>

						<td class="text-center">
							<base-action
								@delete="deleteSolCategory(cat.uuid)"
								@edit="
									this.$router.push(
										`/admin/application/solution-categories/${cat.uuid}`
									)
								"
							/>
						</td>
					</tr>

					<tr
						v-if="
							!paginatedSolCategory ||
							!paginatedSolCategory.length
						"
					>
						<td colspan="6" class="text-center py-3">
							No Solution Category Available
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div>
			<Pagination
				:total-items="filteredSolCategories.length"
				v-if="getPerPage < filteredSolCategories.length"
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
import TableSkeleton from "../UI/TableSkeleton.vue";

export default {
	components: { BaseAction, Pagination, BaseSearch, TableSkeleton },
	data() {
		return {
			route: this.$route.path,
			searchQuery: "",
		};
	},
	mixins: [sortMixin],
	computed: {
		...mapGetters("SolCategory", ["filteredSolCategory"]),
		...mapGetters("Pagination", ["getCurrentPage", "getPerPage"]),

		isTableLoading() {
			return this.$store.getters["TableLoader/isTableLoading"](
				"solCategoryTable"
			);
		},
		paginatedSolCategory() {
			const start = (this.getCurrentPage - 1) * this.getPerPage;
			return this.sortedSolCategory.slice(start, start + this.getPerPage);
		},
		sortedSolCategory() {
			return this.sortItems(this.filteredSolCategories);
		},
		filteredSolCategories() {
			if (!this.searchQuery) return this.solCategory;

			const q = this.searchQuery.toLowerCase();

			const a = this.solCategory.filter((cat) =>
				[cat.title]
					.filter(Boolean)
					.some((val) => String(val).toLowerCase().includes(q))
			);
			return a;
		},

		solCategory() {
			return this.filteredSolCategory;
		},
	},
	async mounted() {
		await this.fetchSolCategory();
	},
	methods: {
		...mapActions("SolCategory", ["fetchSolCategory", "deleteSolCategory"]),
	},
	watch: {
		$route(to) {
			this.route = to.path;
		},
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
	overflow-x: auto;
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
td,
th {
	white-space: nowrap;
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

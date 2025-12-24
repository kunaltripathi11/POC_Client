<template>
	<div class="main-content mt-3">
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold mb-2">Application List</h3>
			<div style="display: flex; justify-content: space-between">
				<BaseSearch v-model="searchQuery"></BaseSearch>
				<router-link to="/admin/application/apps/add-app">
					<button class="btn btn-primary mb-2" @click="create">
						Create App
					</button>
				</router-link>
			</div>
		</div>
		<div class="table-wrapper">
			<table class="table table-hover align-middle shadow-sm">
				<thead>
					<tr>
						<th>ID</th>
						<th @click="sortBy('title')" class="sortable">
							Application Name
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
							Order
							<span v-if="sortKey === 'display_order'">
								{{ sortOrder === "asc" ? "▲" : "▼" }}
							</span>
						</th>

						<th>Application Icon</th>
						<th @click="sortBy('active')" class="sortable">
							Active
							<span v-if="sortKey === 'active'">
								{{ sortOrder === "asc" ? "▲" : "▼" }}
							</span>
						</th>

						<th @click="sortBy('updated_by_name')" class="sortable">
							Last Updated By
							<span v-if="sortKey === 'updated_by_name'">
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
						:columns="8"
					/>
					<tr
						v-else
						v-for="(app, index) in paginatedApps"
						:key="index"
					>
						<td>{{ index + 1 }}</td>
						<td>{{ app.title }}</td>
						<td>{{ app.category_name }}</td>
						<td>{{ app.display_order }}</td>
						<td>
							<span class="material-icons">
								{{ app.icon.toLowerCase() }}
							</span>
						</td>
						<td>{{ app.active ? "Active" : "Inactive" }}</td>
						<td>{{ app.updated_by_name }}</td>
						<td class="text-center">
							<base-action
								@delete="deleteApplication(app.uuid)"
								@edit="editApplication(app)"
							/>
						</td>
					</tr>

					<tr v-if="!paginatedApps || !paginatedApps.length">
						<td colspan="7" class="text-center text-muted py-3">
							No Applications Available
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div>
			<Pagination
				:total-items="filteredApplications.length"
				v-if="getPerPage < filteredApplications.length"
			></Pagination>
		</div>
	</div>
</template>

<script>
import BaseAction from "../UI/BaseAction.vue";
import { mapActions, mapGetters } from "vuex";
import Pagination from "../UI/Pagination.vue";
import BaseSearch from "../UI/BaseSearch.vue";
import sortMixin from "../../mixins/sortMixin";
import BaseSpinner from "../UI/BaseSpinner.vue";
import TableSkeleton from "../UI/TableSkeleton.vue";

export default {
	components: {
		BaseAction,
		Pagination,
		BaseSearch,
		BaseSpinner,
		TableSkeleton,
	},
	data() {
		return {
			apps: [],
			searchQuery: "",
		};
	},
	mixins: [sortMixin],
	async mounted() {
		await this.fetchApplications();
		console.log("isTableLoading", this.isTableLoading);
	},

	computed: {
		...mapGetters("Application", ["allApplications"]),
		...mapGetters("Pagination", ["getCurrentPage", "getPerPage"]),

		isTableLoading() {
			return this.$store.getters["TableLoader/isTableLoading"](
				"applicationTable"
			);
		},
		applications() {
			return this.allApplications;
		},
		filteredApplications() {
			if (!this.searchQuery) return this.applications;

			const q = this.searchQuery.toLowerCase();

			const a = this.applications.filter((app) =>
				[
					app.title,
					app.category_name,
					app.icon,
					app.display_order,
					app.active ? "active" : "inactive",
					app.updated_by_name,
				]
					.filter(Boolean)
					.some((val) => String(val).toLowerCase().includes(q))
			);
			return a;
		},

		sortedApps() {
			return this.sortItems(this.filteredApplications);
		},

		paginatedApps() {
			const start = (this.getCurrentPage - 1) * this.getPerPage;
			return this.sortedApps?.slice(start, start + this.getPerPage);
		},
	},

	methods: {
		...mapActions("Application", [
			"fetchApplications",
			"deleteApplication",
			"editApplication",
		]),
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

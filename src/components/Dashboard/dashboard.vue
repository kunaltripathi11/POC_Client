<template>
	<div class="dashboard-wrapper">
		<div v-if="isLoading" class="dashboard-loader">
			<BaseSpinner />
		</div>
		<div class="main-content" :class="{ blurred: isLoading }">
			<div style="display: flex; justify-content: space-between">
				<h3 class="fw-bold mb-3">Dashboard List</h3>
				<div style="display: flex; justify-content: space-between">
					<BaseSearch v-model="searchQuery"></BaseSearch>
					<router-link to="/admin/dashboard/add">
						<button class="btn btn-primary mb-3">
							Create Dashboard
						</button>
					</router-link>
				</div>
			</div>

			<div class="table-wrapper">
				<table class="table table-hover align-middle">
					<thead class="table-primary sticky-header">
						<tr>
							<th>Id</th>
							<th @click="sortBy('name')" class="sortable">
								Title
								<span v-if="sortKey === 'name'">
									{{ sortOrder === "asc" ? "▲" : "▼" }}
								</span>
							</th>

							<th @click="sortBy('application')" class="sortable">
								Application
								<span v-if="sortKey === 'application'">
									{{ sortOrder === "asc" ? "▲" : "▼" }}
								</span>
							</th>

							<th @click="sortBy('url')" class="sortable">
								URL
								<span v-if="sortKey === 'url'">
									{{ sortOrder === "asc" ? "▲" : "▼" }}
								</span>
							</th>
							<th @click="sortBy('updated_at')" class="sortable">
								Last Updated
								<span v-if="sortKey === 'updated_at'">
									{{ sortOrder === "asc" ? "▲" : "▼" }}
								</span>
							</th>

							<th
								@click="sortBy('updated_by_name')"
								class="sortable"
							>
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
							:columns="7"
						/>
						<tr
							v-else
							v-for="(dash, index) in paginatedDashboards"
							:key="index"
						>
							<td>{{ index + 1 }}</td>
							<td>
								<router-link
									:to="`/admin/dashboard/design/${dash.uuid}`"
									class="text-decoration-none fw-semibold text-primary"
								>
									{{ dash.name }}
								</router-link>
							</td>
							<td>{{ dash.application }}</td>
							<td>{{ dash.url }}</td>
							<td>{{ formatDate(dash.updated_at) }}</td>
							<td>{{ dash.updated_by_name?.toUpperCase() }}</td>

							<td class="text-center">
								<base-action
									@delete="deleteDashboard(dash.uuid)"
									@edit="
										this.$router.push(
											`/admin/dashboard/${dash.uuid}`
										)
									"
								/>
							</td>
						</tr>

						<tr
							v-if="
								!paginatedDashboards ||
								!paginatedDashboards.length
							"
						>
							<td colspan="6" class="text-center text-muted py-3">
								No Dashboards Available
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div>
				<Pagination
					:total-items="filteredDashboardsSearch.length"
					v-if="getPerPage < filteredDashboardsSearch.length"
				/>
			</div>
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
import BaseSpinner from "../UI/BaseSpinner.vue";

export default {
	components: {
		BaseAction,
		Pagination,
		BaseSearch,
		TableSkeleton,
		BaseSpinner,
	},
	data() {
		return { searchQuery: "" };
	},
	mixins: [sortMixin],
	async mounted() {
		await this.fetchDashboards();
	},
	computed: {
		...mapGetters("Dashboard", ["filteredDashboards"]),
		...mapGetters("Pagination", ["getCurrentPage", "getPerPage"]),

		isTableLoading() {
			return this.$store.getters["TableLoader/isTableLoading"](
				"dashboardTable"
			);
		},

		isLoading() {
			return this.$store.getters["Loader/isLoading"];
		},

		paginatedDashboards() {
			const start = (this.getCurrentPage - 1) * this.getPerPage;
			return this.sortedDashboard.slice(start, start + this.getPerPage);
		},
		sortedDashboard() {
			return this.sortItems(this.filteredDashboardsSearch);
		},
		filteredDashboardsSearch() {
			if (!this.searchQuery) return this.dashboards;

			const q = this.searchQuery.toLowerCase();

			const a = this.dashboards.filter((dash) =>
				[dash.name, dash.application, dash.url]
					.filter(Boolean)
					.some((val) => String(val).toLowerCase().includes(q))
			);
			return a;
		},
		dashboards() {
			return this.filteredDashboards;
		},
	},
	async mounted() {
		await this.fetchDashboards();
	},
	methods: {
		...mapActions("Dashboard", ["fetchDashboards", "deleteDashboard"]),

		formatDate(date) {
			return new Date(date).toLocaleString("en-GB", {
				day: "2-digit",
				month: "short",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false,
			});
		},
	},
};
</script>
<style scoped>
.main-content {
	margin: 1rem 1rem 0 1rem;
	padding: 1rem 1rem 0 1rem;
	border: 1px solid #e5e7eb;
	border-radius: 10px;
	height: calc(100vh - 8rem);
	overflow: hidden;
}
.table-wrapper {
	margin-top: 0.1rem;
	overflow: hidden;
	max-height: calc(100vh - 15rem);
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

.dashboard-wrapper {
	position: relative;
	height: 100%;
}

.dashboard-loader {
	position: absolute;
	inset: 0;
	background: rgba(255, 255, 255, 0.6);
	z-index: 5;

	display: flex;
	align-items: center;
	justify-content: center;
}

.blurred {
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.2s ease;
}
</style>

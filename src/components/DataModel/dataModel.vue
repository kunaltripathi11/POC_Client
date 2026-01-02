<template>
	<div class="content-wrapper">
		<div v-if="isLoading" class="content-loader">
			<BaseSpinner />
		</div>
		<div class="main-content" :class="{ blurred: isLoading }">
			<div style="display: flex; justify-content: space-between">
				<h3 class="fw-bold">Data Model List</h3>
				<div style="display: flex; justify-content: space-between">
					<BaseSearch v-model="searchQuery"></BaseSearch>
					<router-link to="/admin/data-model/add-data-model">
						<button class="btn btn-primary mb-3">
							Create Model
						</button>
					</router-link>
				</div>
			</div>
			<div class="table-wrapper">
				<table class="table table-hover align-middle shadow-sm">
					<thead>
						<tr>
							<th @click="sortBy('name')" class="sortable">
								Name
								<span v-if="sortKey === 'name'">
									{{ sortOrder === "asc" ? "▲" : "▼" }}
								</span>
							</th>

							<th @click="sortBy('description')" class="sortable">
								Description
								<span v-if="sortKey === 'description'">
									{{ sortOrder === "asc" ? "▲" : "▼" }}
								</span>
							</th>
							<th
								@click="sortBy('primary_key_field')"
								class="sortable"
							>
								Primary Key
								<span v-if="sortKey === 'primary_key_field'">
									{{ sortOrder === "asc" ? "▲" : "▼" }}
								</span>
							</th>
							<th @click="sortBy('created_at')" class="sortable">
								Created At
								<span v-if="sortKey === 'created_at'">
									{{ sortOrder === "asc" ? "▲" : "▼" }}
								</span>
							</th>
							<th @click="sortBy('updated_at')" class="sortable">
								Last Updated At
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
						<tr v-else v-for="model in paginatedModels">
							<td>
								<router-link
									:to="`/admin/data-model/${model.uuid}`"
									class="text-decoration-none fw-semibold text-primary"
									>{{ model.name }}
								</router-link>
							</td>
							<td>{{ model.description }}</td>
							<td>{{ model.primary_key_field }}</td>
							<td>{{ formatDate(model.created_at) }}</td>
							<td>{{ formatDate(model.updated_at) }}</td>
							<td>{{ model.updated_by_name }}</td>

							<td class="text-center">
								<base-action
									@delete="deleteModel(model.uuid)"
									@edit="
										this.$router.push(
											`/admin/data-model/${model.uuid}`
										)
									"
								/>
							</td>
						</tr>
						<tr
							v-if="
								!paginatedModels ||
								(paginatedModels && !paginatedModels.length)
							"
						>
							<td colspan="6" class="text-center text-muted py-3">
								No Data Models Available
							</td>
						</tr>
					</tbody>
				</table>
				<div>
					<Pagination
						:total-items="filteredModelSearch.length"
						v-if="getPerPage < filteredModelSearch.length"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import BaseAction from "../UI/BaseAction.vue";
import { mapActions, mapGetters } from "vuex";
import BaseSearch from "../UI/BaseSearch.vue";
import Pagination from "../UI/Pagination.vue";
import sortMixin from "../../mixins/sortMixin";
import BaseSpinner from "../UI/BaseSpinner.vue";
import TableSkeleton from "../UI/TableSkeleton.vue";

export default {
	data() {
		return { searchQuery: "" };
	},

	mixins: [sortMixin],
	async mounted() {
		await this.fetchModels();
	},
	computed: {
		...mapGetters("DataModel", ["filteredModel"]),
		...mapGetters("Pagination", ["getCurrentPage", "getPerPage"]),

		isLoading() {
			return this.$store.getters["Loader/isLoading"];
		},

		isTableLoading() {
			return this.$store.getters["TableLoader/isTableLoading"](
				"modelTable"
			);
		},

		paginatedModels() {
			const start = (this.getCurrentPage - 1) * this.getPerPage;
			return this.sortedModels.slice(start, start + this.getPerPage);
		},
		dataModels() {
			return this.filteredModel;
		},
		sortedModels() {
			return this.sortItems(this.filteredModelSearch);
		},
		filteredModelSearch() {
			if (!this.searchQuery) return this.dataModels;

			const q = this.searchQuery.toLowerCase();

			const a = this.dataModels.filter((model) =>
				[model.name, model.description, model.primary_key_field]
					.filter(Boolean)
					.some((val) => String(val).toLowerCase().includes(q))
			);
			return a;
		},
	},

	methods: {
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
		...mapActions("DataModel", ["fetchModels", "deleteModel"]),
	},
	components: {
		BaseAction,
		BaseSearch,
		Pagination,
		BaseSpinner,
		TableSkeleton,
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
	border-radius: 10px;
	overflow: hidden;
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

.blurred {
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.2s ease;
}

.content-wrapper {
	position: relative;
	height: 100%;
}

.content-loader {
	position: absolute;
	inset: 0;
	background: rgba(255, 255, 255, 0.6);
	z-index: 5;

	display: flex;
	align-items: center;
	justify-content: center;
}
</style>

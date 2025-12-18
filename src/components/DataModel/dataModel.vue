<template>
	<div class="main-content">
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold">Data Model List</h3>
			<div style="display: flex; justify-content: space-between">
				<BaseSearch v-model="searchQuery"></BaseSearch>
				<router-link to="/admin/data-model/add-data-model">
					<button class="btn btn-primary mb-3">Create Model</button>
				</router-link>
			</div>
		</div>
		<table class="table table-hover align-middle shadow-sm">
			<thead class="table-primary">
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
					<th @click="sortBy('primary_key_field')" class="sortable">
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

					<th class="text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="model in paginatedModels">
					<td>{{ model.name }}</td>
					<td>{{ model.description }}</td>
					<td>{{ model.primary_key_field }}</td>
					<td>{{ formatDate(model.created_at) }}</td>
					<td>{{ formatDate(model.updated_at) }}</td>

					<td class="text-center">
						<base-action
							@delete="deleteModel(model.uuid)"
							@edit="editModel(model)"
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
</template>
<script>
import BaseAction from "../UI/BaseAction.vue";
import { mapActions, mapGetters } from "vuex";
import BaseSearch from "../UI/BaseSearch.vue";
import Pagination from "../UI/Pagination.vue";
import sortMixin from "../../mixins/sortMixin";

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
		...mapActions("DataModel", ["fetchModels", "deleteModel", "editModel"]),
	},
	components: {
		BaseAction,
		BaseSearch,
		Pagination,
	},
};
</script>
<style scoped>
.main-content {
	margin: 1rem 1rem 0 1rem;

	height: calc(100vh - 8rem);

	padding: 1rem 1rem 0 1rem;

	border: 1px solid #e5e7eb;
	border-radius: 10px;

	height: calc(100vh - 6rem);
}
.table {
	border-radius: 10px;
	overflow: hidden;
}
td,
th {
	vertical-align: middle;
}
th {
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

<template>
	<div class="main-content">
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold">Data Model List</h3>
			<router-link to="/admin/data-model/add-data-model">
				<button class="btn btn-primary mb-3">Create Model</button>
			</router-link>
		</div>
		<table class="table table-hover align-middle shadow-sm">
			<thead class="table-primary">
				<tr>
					<th>Name</th>
					<th>Description</th>
					<th>Primary Key</th>
					<th>Created At</th>
					<th>Last Updated At</th>
					<th class="text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="model in dataModels">
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
				<tr v-if="!dataModels || (dataModels && !dataModels.length)">
					<td colspan="6" class="text-center text-muted py-3">
						No Data Models Available
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import BaseAction from "../UI/BaseAction.vue";
import { mapActions, mapGetters } from "vuex";

export default {
	data() {
		return {};
	},
	async mounted() {
		await this.fetchModels();
	},
	computed: {
		...mapGetters("DataModel", ["filteredModel"]),
		dataModels() {
			return this.filteredModel;
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
	},
};
</script>
<style scoped>
.main-content {
	margin-top: 6rem;
	margin-left: 14rem;
	margin-right: 1rem;
	height: calc(100vh - 8rem);

	padding: 1rem 1rem 0 1rem;

	border: 1px solid #e5e7eb;
	border-radius: 10px;

	height: calc(100vh - 7rem);
}
.table {
	border-radius: 10px;
	overflow: hidden;
}
td,
th {
	vertical-align: middle;
}
</style>

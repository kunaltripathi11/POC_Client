<template>
	<div class="main-content container mt-4">
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold mb-3">Data Model List</h3>
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
						<base-action @delete="deleteModel(model.uuid)" />
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
		await this.fetchModels("http://localhost:3000/admin/data-model");
	},
	computed: {
		...mapGetters("DataModel", ["filteredModel"]),
		dataModels() {
			return this.filteredModel;
		},
	},

	methods: {
		formatDate(date) {
			return new Date(date).toUTCString().slice(5, -4);
		},
		...mapActions("DataModel", ["fetchModels", "deleteModel"]),
	},
	components: {
		BaseAction,
	},
};
</script>
<style scoped>
.main-content {
	padding-top: 4rem;
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

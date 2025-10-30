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
						<button
							class="btn btn-sm btn-outline-primary me-2"
							@click="editModel(model)"
						>
							<font-awesome-icon icon="fa-solid fa-pen" />
						</button>
						<button
							class="btn btn-sm btn-outline-danger"
							@click="deleteModel(model)"
						>
							<font-awesome-icon icon="fa-solid fa-trash" />
						</button>
					</td>
				</tr>
				<tr v-if="dataModels.length === 0">
					<td colspan="6" class="text-center text-muted py-3">
						No Data Models Available
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			dataModels: [],
		};
	},
	async mounted() {
		await this.fetchModels();
	},
	methods: {
		formatDate(date) {
			return new Date(date).toUTCString().slice(5, -4);
		},
		async fetchModels() {
			try {
				const response = await fetch(
					"http://localhost:3000/admin/data-model"
				);
				const json = await response.json();

				this.dataModels = json.data;
			} catch (err) {
				console.error("Error loading Category", err);
			}
		},
		// editModel(cat) {
		// 	this.$router.push(`/admin/data-models/${dash.uuid}`);
		// },
		async deleteModel(model) {
			if (!confirm("Sure? This will hide the Data Model.")) return;
			await fetch(
				`http://localhost:3000/admin/data-model/${model.uuid}`,
				{
					method: "DELETE",
				}
			);
			this.fetchModels();
		},
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

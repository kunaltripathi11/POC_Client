<template>
	<div class="main-content container mt-4">
		<div style="display: flex; justify-content: space-between">
			<!-- <h3 class="fw-bold mb-3"><Filter></Filter></h3> -->
			<!-- <button class="btn btn-primary mb-3">Create Dashboard</button> -->
		</div>
		<table class="table table-hover align-middle shadow-sm">
			<thead class="table-primary">
				<tr>
					<th>ID</th>
					<th>Application Name</th>
					<th>Category</th>
					<th>Order</th>
					<th>Application Icon</th>
					<th>Active</th>
					<th class="text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(app, index) in applications" :key="index">
					<td>{{ index + 1 }}</td>
					<td>{{ app.title }}</td>
					<td>{{ app.category_name }}</td>
					<td>{{ app.display_order }}</td>
					<td>
						<span class="material-icons">
							{{ app.icon.toLowerCase() }}</span
						>
					</td>
					<td>{{ app.active ? "Active" : "InActive" }}</td>

					<td class="text-center">
						<button
							class="btn btn-sm me-2 action"
							@click="editApplication(app)"
						>
							<font-awesome-icon
								icon="fa-solid fa-pen"
								style="color: blue"
							/>
						</button>
						<button
							class="btn btn-sm action"
							@click="deleteAppliction(app)"
						>
							<font-awesome-icon
								icon="fa-solid fa-trash"
								style="color: red"
							/>
						</button>
					</td>
				</tr>
				<tr v-if="applications.length === 0">
					<td colspan="6" class="text-center text-muted py-3">
						No Applications Available
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
// import Filter from "./filter.vue";

export default {
	// components: {
	// 	Filter,
	// },
	data() {
		return {
			applications: [],
			active: null,
		};
	},
	async mounted() {
		await this.fetchApplications();
	},
	methods: {
		async fetchApplications() {
			try {
				const response = await fetch(
					"http://localhost:3000/admin/application/apps"
				);
				const json = await response.json();
				this.applications = json.data;
			} catch (err) {
				console.error("Error loading Application", err);
			}
		},
		// editApplication(app) {
		// 	console.log(app);
		// 	this.$router.push(`/admin/application/apps/edit/${dash.uuid}`);
		// },
		async deleteAppliction(app) {
			if (!confirm("Sure? This will hide the dashboard.")) return;
			await fetch(
				`http://localhost:3000/admin/application/apps/edit/${app.uuid}`,
				{
					method: "DELETE",
				}
			);
			this.fetchApplications();
		},
	},
};
</script>
<style scoped>
.table {
	border-radius: 10px;
	overflow: hidden;
}
td,
th {
	vertical-align: middle;
}

button:hover {
	border: 1px solid gray !important;
	border-radius: 30%;
}
button {
	border-radius: 30%;
}
</style>

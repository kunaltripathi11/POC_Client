<template>
	<div class="main-content container mt-4">
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold mb-3">Dashboard List</h3>
			<button class="btn btn-primary mb-3">Create Dashboard</button>
		</div>
		<table class="table table-hover align-middle shadow-sm">
			<thead class="table-primary">
				<tr>
					<th>Id</th>
					<th>Title</th>
					<th>Application</th>
					<th>URL</th>
					<th>Updated At</th>
					<th class="text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(dash, index) in dashboards" :key="index">
					<td>{{ index + 1 }}</td>
					<td>{{ dash.title }}</td>
					<td>{{ dash.application }}</td>
					<td>{{ dash.url }}</td>
					<td>{{ formatDate(dash.updated_at) }}</td>
					<td class="text-center">
						<button
							class="btn btn-sm btn-outline-primary me-2"
							@click="editDashboard(dash)"
						>
							<font-awesome-icon icon="fa-solid fa-pen" />
						</button>
						<button
							class="btn btn-sm btn-outline-danger"
							@click="deleteDashboard(dash)"
						>
							<font-awesome-icon icon="fa-solid fa-trash" />
						</button>
					</td>
				</tr>
				<tr v-if="dashboards.length === 0">
					<td colspan="6" class="text-center text-muted py-3">
						No Dashboards Available
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
			dashboards: [],
		};
	},
	async mounted() {
		await this.fetchDashboards();
	},
	methods: {
		async fetchDashboards() {
			try {
				const response = await fetch(
					"http://localhost:3000/admin/dashboard"
				);
				const json = await response.json();
				this.dashboards = json.data;
			} catch (err) {
				console.error("Error loading dashboards", err);
			}
		},
		formatDate(date) {
			return new Date(date).toLocaleDateString();
		},
		editDashboard(dash) {
			console.log(dash);
			this.$router.push(`/admin/dashboard/edit/${dash.uuid}`);
		},
		async deleteDashboard(dash) {
			if (!confirm("Sure? This will hide the dashboard.")) return;
			await fetch(`http://localhost:3000/admin/dashboard/${dash.uuid}`, {
				method: "DELETE",
			});
			this.fetchDashboards();
		},
	},
};
</script>
<style scoped>
.main-content {
	padding: 4rem;
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

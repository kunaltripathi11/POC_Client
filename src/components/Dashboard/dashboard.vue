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
					<td class="text-center">
						<base-action @delete="deleteDashboard(dash.uuid)" />
					</td>
				</tr>
				<tr v-if="!dashboards || (dashboards && !dashboards.length)">
					<td colspan="6" class="text-center text-muted py-3">
						No Dashboards Available
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
		await this.fetchDashboards();
	},
	computed: {
		...mapGetters("Dashboard", ["filteredDashboards"]),
		dashboards() {
			return this.filteredDashboards;
		},
	},
	async mounted() {
		console.log(this.$route);
		await this.fetchDashboards();
	},
	methods: {
		...mapActions("Dashboard", ["fetchDashboards", "deleteDashboard"]),

		formatDate(date) {
			return new Date(date).toUTCString().slice(5, -4);
		},
	},

	components: {
		BaseAction,
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

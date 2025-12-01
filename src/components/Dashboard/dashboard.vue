<template>
	<div class="main-content">
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold mb-3">Dashboard List</h3>
			<router-link to="/admin/dashboard/add">
				<button class="btn btn-primary mb-3">Create Dashboard</button>
			</router-link>
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
						<base-action
							@delete="deleteDashboard(dash.uuid)"
							@edit="editDashboard(dash)"
						/>
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
		await this.fetchDashboards();
	},
	methods: {
		...mapActions("Dashboard", [
			"fetchDashboards",
			"deleteDashboard",
			"editDashboard",
		]),

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

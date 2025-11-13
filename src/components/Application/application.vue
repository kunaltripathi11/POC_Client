<template>
	<div class="main-content container mt-4">
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold mb-3">Application List</h3>
			<router-link to="/admin/application/apps/add-app">
				<button class="btn btn-primary mb-3" @click="create">
					Create App
				</button>
			</router-link>
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
						<base-action @delete="deleteApplication(app.uuid)" />
					</td>
				</tr>
				<tr
					v-if="
						!applications || (applications && !applications.length)
					"
				>
					<td colspan="6" class="text-center text-muted py-3">
						No Applications Available
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import BaseAction from "../UI/BaseAction.vue";
import { mapActions, mapGetters } from "vuex";

// import Filter from "./filter.vue";

export default {
	// components: {
	// 	Filter,
	// },
	data() {
		return {};
	},
	async mounted() {
		await this.fetchApplications();
	},
	computed: {
		...mapGetters("Application", ["allApplications"]),
		applications() {
			return this.allApplications;
		},
	},

	methods: {
		...mapActions("Application", [
			"fetchApplications",
			"deleteApplication",
		]),
	},
	components: {
		BaseAction,
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
</style>

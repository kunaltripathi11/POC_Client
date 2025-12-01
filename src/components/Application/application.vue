<template>
	<div class="main-content mt-3">
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold mb-2">Application List</h3>
			<router-link to="/admin/application/apps/add-app">
				<button class="btn btn-primary mb-2" @click="create">
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
				<tr v-for="(app, index) in paginatedApps" :key="index">
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
						<base-action
							@delete="deleteApplication(app.uuid)"
							@edit="editApplication(app)"
						/>
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
		<div>
			<Pagination
				:total-items="applications.length"
				v-if="this.getPerPage > totalItems"
			></Pagination>
		</div>
	</div>
</template>

<script>
import BaseAction from "../UI/BaseAction.vue";
import { mapActions, mapGetters } from "vuex";
import Pagination from "../UI/Pagination.vue";

export default {
	data() {
		return {
			apps: [],
		};
	},
	async mounted() {
		this.apps = await this.fetchApplications();
		console.log("SPPPPPPPPPPD", this.applications.length);
	},
	computed: {
		...mapGetters("Application", ["allApplications"]),
		...mapGetters("Pagination", ["getCurrentPage", "getPerPage"]),

		applications() {
			return this.allApplications;
		},
		paginatedApps() {
			const start = (this.getCurrentPage - 1) * this.getPerPage;
			return this.applications.slice(start, start + this.getPerPage);
		},
	},

	methods: {
		...mapActions("Application", [
			"fetchApplications",
			"deleteApplication",
			"editApplication",
		]),
	},
	components: {
		BaseAction,
		Pagination,
	},
};
</script>
<style scoped>
.main-content {
	padding: 1rem 1rem 0 1rem;
	background: #fff;
	margin: 0 1rem;
	margin-bottom: 2rem;
	border: 1px solid #e5e7eb;
	border-radius: 10px;
	max-height: fit-content;
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

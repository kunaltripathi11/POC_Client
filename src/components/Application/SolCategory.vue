<template>
	<router-view></router-view>
	<div class="main-content mt-3">
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold mb-2">Solution Category List</h3>
			<router-link to="/admin/application/solution-categories/add">
				<button class="btn btn-primary mb-2" @click="create">
					Create Sol
				</button>
			</router-link>
		</div>
		<div class="table-wrapper">
			<table class="table table-hover align-middle shadow-sm">
				<thead class="table-primary">
					<tr>
						<th>ID</th>
						<th>UUID</th>
						<th>Solution Category</th>
						<th class="text-center">Actions</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="cat in paginatedSolCategory">
						<td>{{ cat.id }}</td>
						<td>{{ cat.uuid }}</td>
						<td>{{ cat.title }}</td>

						<td class="text-center">
							<base-action
								@delete="deleteSolCategory(cat.uuid)"
								@edit="editSolCategory(cat)"
							/>
						</td>
					</tr>

					<tr v-if="!solCategory || !solCategory.length">
						<td colspan="6" class="text-center py-3">
							No Solution Category Available
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="pageination">
			<Pagination
				:total-items="solCategory.length"
				v-if="getPerPage < solCategory.length"
			/>
		</div>
	</div>
</template>
<script>
import BaseAction from "../UI/BaseAction.vue";
import { mapActions, mapGetters } from "vuex";
import Pagination from "../UI/Pagination.vue";

export default {
	components: { BaseAction, Pagination },
	data() {
		return {
			route: this.$route.path,
		};
	},
	computed: {
		...mapGetters("SolCategory", ["filteredSolCategory"]),
		...mapGetters("Pagination", ["getCurrentPage", "getPerPage"]),

		paginatedSolCategory() {
			const start = (this.getCurrentPage - 1) * this.getPerPage;
			return this.solCategory.slice(start, start + this.getPerPage);
		},

		solCategory() {
			return this.filteredSolCategory;
		},
	},
	async mounted() {
		await this.fetchSolCategory();
	},
	methods: {
		...mapActions("SolCategory", [
			"fetchSolCategory",
			"deleteSolCategory",
			"editSolCategory",
		]),
	},
	watch: {
		$route(to) {
			this.route = to.path;
		},
	},
};
</script>
<style scoped>
.main-content {
	padding: 1rem 1rem 1rem 1rem;
	background: #fff;
	margin: 0 1rem;
	border: 1px solid #e5e7eb;
	border-radius: 10px;

	margin-bottom: 0.2rem;
	max-height: calc(100vh - 9rem);
}

.table-wrapper {
	border-radius: 10px;
	overflow: hidden;
	border: 1px solid #e5e7eb;
	max-height: calc(100vh - 16rem);

	overflow-y: auto;
	border: 1px solid #e5e7eb;
	border-radius: 10px;
}

thead th {
	position: sticky;
	top: 0;
	z-index: 5;
}
</style>

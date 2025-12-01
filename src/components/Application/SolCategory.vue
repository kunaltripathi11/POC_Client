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
				<tr v-for="cat in solCategory">
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
				<tr v-if="!solCategory || (solCategory && !solCategory.length)">
					<td colspan="6" class="text-center py-3">
						No Solution Category Available
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import BaseAction from "../UI/BaseAction.vue";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
	components: { BaseAction },
	data() {
		return {
			route: this.$route.path,
		};
	},
	computed: {
		...mapGetters("SolCategory", ["filteredSolCategory"]),
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
	padding: 1rem 1rem 0 1rem;
	background: #fff;
	margin: 0 1rem;
	border: 1px solid #e5e7eb;
	border-radius: 10px;

	margin-bottom: 2rem;
	max-height: fit-content;
}
.table {
	overflow-y: auto;
	max-height: 80vh;
	border-radius: 10px;
}
td,
th {
	vertical-align: middle;
}
/* button:hover {
	border: 1px solid gray !important;
	border-radius: 30%;
}
button {
	border-radius: 30%;
} */
</style>

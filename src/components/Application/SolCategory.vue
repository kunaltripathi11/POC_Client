<template>
	<div class="main-content container mt-4">
		<div style="display: flex; justify-content: space-between"></div>
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
						<base-action @delete="deleteSolCategory(cat.uuid)" />
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
		return {};
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
		...mapActions("SolCategory", ["fetchSolCategory", "deleteSolCategory"]),
		...mapMutations("SolCategory", ["setSolCategory"]),
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
/* button:hover {
	border: 1px solid gray !important;
	border-radius: 30%;
}
button {
	border-radius: 30%;
} */
</style>

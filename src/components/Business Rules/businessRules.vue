<template>
	<div class="main-content container mt-4">
		<h3 class="fw-bold mb-3">Business Rules</h3>
		<table class="table table-hover align-middle shadow-sm">
			<thead class="table-primary">
				<tr>
					<th>Name</th>
					<th>Description</th>
					<th>Tags</th>

					<th class="text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="rule in businessRules">
					<td>{{ rule.name }}</td>
					<td>{{ rule.description }}</td>
					<td>{{ rule.tags }}</td>
					<td class="text-center">
						<base-action @delete="deleteRule(rule.uuid)" />
					</td>
				</tr>
				<tr
					v-if="
						!businessRules ||
						(businessRules && !businessRules.length) === 0
					"
				>
					<td colspan="6" class="text-center text-muted py-3">
						No Business Rules Available
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import BaseAction from "../UI/BaseAction.vue";

export default {
	data() {
		return {};
	},
	async mounted() {
		await this.fetchRules();
	},
	computed: {
		...mapGetters("BusinessRule", ["filteredRules"]),
		businessRules() {
			return this.filteredRules;
		},
	},
	async mounted() {
		await this.fetchRules();
	},
	methods: {
		...mapActions("BusinessRule", ["fetchRules", "deleteRule"]),
	},
	components: {
		BaseAction,
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
button:hover {
	border: 1px solid gray !important;
	border-radius: 30%;
}
button {
	border-radius: 30%;
}
</style>

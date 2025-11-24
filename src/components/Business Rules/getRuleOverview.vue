<template>
	<div class="main">
		<table class="table table-hover align-middle shadow-sm">
			<thead class="table-primary">
				<tr>
					<th v-for="column in columns">{{ column }}</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="(rule, index) in rules" :key="index">
					<td v-for="(column, index1) in columns" :key="index1">
						{{ rule[column] }}
					</td>
				</tr>

				<tr v-if="!columns || !rules">
					<td colspan="6" class="text-center text-muted py-3">
						No Data Available
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	data() {
		return { isSelected: "overview" };
	},

	methods: {
		...mapActions("BusinessRule", ["fetchRuleByID"]),
		changeSelected(option) {
			this.isSelected = option;
		},
	},
	computed: {
		...mapGetters("BusinessRule", ["getColumns", "getRuleById"]),
		columns() {
			return this.getColumns;
		},

		rules() {
			return this.getRuleById;
		},
	},

	mounted() {
		console.log("UUID");
		this.fetchRuleByID(this.$route.params.uuid);

		console.log("columns", this.rules);
	},
};
</script>
<style scoped>
.main {
	width: 100%;
	overflow-x: auto;
}

.table {
	max-width: 1100px;
	min-width: 1000px;
	border: 0.7px solid rgb(154, 151, 151);
	overflow-x: auto;
}

td,
th {
	white-space: nowrap;
}
</style>

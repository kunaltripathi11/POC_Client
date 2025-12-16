<template>
	<div class="main">
		<div class="table-wrapper">
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
		this.fetchRuleByID(this.$route.params.uuid);
	},
};
</script>
<style scoped>
.main {
	border: 2px dashed #ccc;
	padding: 20px;
	border-radius: 10px;
	background-color: #fafafa;

	max-width: calc(100vw - 2rem);
	overflow: hidden;
	margin-bottom: 2rem;
}

.table-wrapper {
	max-height: 60vh;
	overflow-x: auto;
	overflow-y: auto;
	background: white;
	border-radius: 8px;
}

.table-wrapper thead th {
	position: sticky;
	top: 0;
	z-index: 2;
	background: #e8f1ff;
}
td,
th {
	white-space: nowrap;
}
</style>

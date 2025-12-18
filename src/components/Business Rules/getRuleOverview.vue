<template>
	<div class="main">
		<div class="table-wrapper">
			<table class="table table-hover align-middle shadow-sm">
				<thead>
					<tr>
						<th
							v-for="column in columns"
							:key="column"
							class="sortable"
							@click="sortBy(column)"
						>
							{{ column }}
							<span v-if="sortKey === column" class="sort-icon">
								<span class="material-icons">
									{{ sortOrder === "asc" ? "▲" : "▼" }}
								</span>
							</span>
						</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="(rule, index) in sortedRule" :key="index">
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
import sortMixin from "../../mixins/sortMixin";

export default {
	data() {
		return { isSelected: "overview" };
	},
	mixins: [sortMixin],

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
		sortedRule() {
			return this.sortItems(this.rules);
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
	background-color: #9cc7f5;
}
td,
th {
	white-space: nowrap;
}
.sortable {
	cursor: pointer;
	user-select: none;
}

.sortable span {
	font-size: 0.7rem;
	margin-left: 4px;
}
</style>

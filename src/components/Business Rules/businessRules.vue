<template>
	<div class="main-content">
		<div class="select">
			<ul class="list-unstyled d-flex flex-direction-row">
				<li
					:class="{ active: isSelected === 'active' }"
					@click="changeSelected('active')"
				>
					ACTIVE
				</li>

				<li
					:class="{ active: isSelected === 'archive' }"
					@click="changeSelected('archive')"
				>
					ARCHIVE
				</li>
			</ul>
		</div>
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold mb-3">Business Rules</h3>
			<div style="display: flex; justify-content: space-between">
				<BaseSearch v-model="searchQuery"></BaseSearch>
				<router-link to="/admin/business-rules/add-business-rules">
					<button class="btn btn-primary mb-3">Create Model</button>
				</router-link>
			</div>
		</div>
		<div class="table-wrapper">
			<table class="table table-hover align-middle shadow-sm">
				<thead class="table-primary">
					<tr>
						<th @click="sortBy('name')" class="sortable">
							Name
							<span v-if="sortKey === 'name'">
								{{ sortOrder === "asc" ? "▲" : "▼" }}
							</span>
						</th>
						<th @click="sortBy('description')" class="sortable">
							Description
							<span v-if="sortKey === 'description'">
								{{ sortOrder === "asc" ? "▲" : "▼" }}
							</span>
						</th>
						<th>Tags</th>
						<th class="text-center">Actions</th>
					</tr>
				</thead>
				<tbody v-if="isSelected === 'active'">
					<tr v-for="rule in paginatedRules">
						<td>
							<router-link
								:to="`/admin/business-rules/${rule.uuid}`"
								class="text-decoration-none fw-semibold text-primary"
								>{{ rule.name }}
							</router-link>
						</td>
						<td>{{ rule.description }}</td>
						<td>{{ rule.tags }}</td>

						<td class="text-center">
							<base-action
								@delete="archiveRule(rule.uuid)"
								@edit="editRule(rule)"
							/>
						</td>
					</tr>
					<tr
						v-if="
							!filteredActiveRuleSearch ||
							(filteredActiveRuleSearch &&
								filteredActiveRuleSearch.length === 0)
						"
					>
						<td colspan="6" class="text-center text-muted py-3">
							No Business Rules Available
						</td>
					</tr>
				</tbody>
				<tbody v-else>
					<tr v-for="rule in paginatedArchivedRules">
						<td>
							{{ rule.name }}
						</td>
						<td>{{ rule.description }}</td>
						<td>{{ rule.tags }}</td>
						<td class="text-center">
							<button
								class="btn btn-sm me-2 action"
								@click="activateRule(rule.uuid)"
							>
								<font-awesome-icon
									icon="fa-solid fa-arrow-rotate-right"
									style="color: blue"
								/>
							</button>
							<button
								class="btn btn-sm action"
								@click="deleteRule(rule.uuid)"
							>
								<font-awesome-icon
									icon="fa-solid fa-trash"
									style="color: red"
								/>
							</button>
						</td>
					</tr>
					<tr
						v-if="
							!filteredArchivedRuleSearch ||
							(filteredArchivedRuleSearch &&
								filteredArchivedRuleSearch.length === 0)
						"
					>
						<td colspan="6" class="text-center text-muted py-3">
							No Archived Business Rules Available
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div>
			<Pagination
				:total-items="filteredActiveRuleSearch.length"
				v-if="
					getPerPage < filteredActiveRuleSearch.length &&
					isSelected === 'active'
				"
			></Pagination>
			<Pagination
				:total-items="filteredArchivedRuleSearch.length"
				v-if="
					getPerPage < filteredArchivedRuleSearch.length &&
					isSelected === 'archive'
				"
			></Pagination>
		</div>
	</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import BaseAction from "../UI/BaseAction.vue";
import Pagination from "../UI/Pagination.vue";
import BaseSearch from "../UI/BaseSearch.vue";
import sortMixin from "../../mixins/sortMixin";

export default {
	data() {
		return { isSelected: "active", searchQuery: "" };
	},
	mixins: [sortMixin],
	computed: {
		...mapGetters("BusinessRule", ["filteredRules", "getArchivedRules"]),
		...mapGetters("Pagination", ["getCurrentPage", "getPerPage"]),

		paginatedRules() {
			const start = (this.getCurrentPage - 1) * this.getPerPage;
			return this.sortedActiveRules.slice(start, start + this.getPerPage);
		},
		paginatedArchivedRules() {
			const start = (this.getCurrentPage - 1) * this.getPerPage;
			return this.sortedArchivedRules.slice(
				start,
				start + this.getPerPage
			);
		},
		businessRules() {
			return this.filteredRules;
		},

		archivedRules() {
			return this.getArchivedRules;
		},
		sortedActiveRules() {
			return this.sortItems(this.filteredActiveRuleSearch);
		},

		sortedArchivedRules() {
			return this.sortItems(this.filteredArchivedRuleSearch);
		},

		filteredActiveRuleSearch() {
			if (!this.searchQuery) return this.businessRules;

			const q = this.searchQuery.toLowerCase();

			const a = this.businessRules.filter((rule) =>
				[rule.name, rule.description, rule.tags]
					.filter(Boolean)
					.some((val) => String(val).toLowerCase().includes(q))
			);
			return a;
		},

		filteredArchivedRuleSearch() {
			if (!this.searchQuery) return this.archivedRules;

			const q = this.searchQuery.toLowerCase();

			const a = this.archivedRules.filter((rule) =>
				[rule.name, rule.description, rule.tags]
					.filter(Boolean)
					.some((val) => String(val).toLowerCase().includes(q))
			);
			return a;
		},
	},
	async mounted() {
		await this.fetchRules();
	},
	methods: {
		...mapActions("BusinessRule", [
			"fetchRules",
			"archiveRule",
			"fetchArchivedRules",
			"editRule",
			"deleteRule",
			"activateRule",
		]),

		changeSelected(option) {
			this.isSelected = option;
		},
	},
	components: {
		BaseAction,
		Pagination,
		BaseSearch,
	},
	watch: {
		async isSelected(newValue, oldValue) {
			if (newValue === "archive") {
				await this.fetchArchivedRules();
			} else if (newValue === "active") {
				await this.fetchRules();
			}
		},
	},
};
</script>
<style scoped>
.main-content {
	margin: 1rem 1rem 0 1rem;
	padding: 1rem 1rem 0 1rem;
	border: 1px solid #e5e7eb;
	border-radius: 10px;
	height: calc(100vh - 7rem);
	overflow: auto;
}
.table {
	border-radius: 10px;
	overflow: hidden;
}
td,
th {
	vertical-align: middle;
}
th {
	background-color: #9cc7f5;
}
ul {
	padding-left: 0.1rem;
	padding-top: 0.1rem;
	padding-bottom: 0.1rem;
	/* border-bottom: 1px solid rgb(218, 209, 209); */
}
li {
	width: 7rem;
	text-align: center;
	height: 2rem;
	padding-top: 0.22rem;
	cursor: pointer;
}
.select li.active {
	color: #ffffff;

	background-color: rgb(23, 79, 176);
	box-shadow: 0 4px 10px rgba(76, 92, 117, 0.4);
	border-radius: 9px;
}
.action {
	border: 0.5px solid rgb(202, 202, 202) !important;
	border-radius: 50% !important;
	margin: 3px;
	padding: 5px;
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

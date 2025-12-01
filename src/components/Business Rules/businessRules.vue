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
					view
					@click="changeSelected('archive')"
				>
					ARCHIVE
				</li>
			</ul>
		</div>
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold mb-3">Business Rules</h3>
			<router-link to="/admin/business-rules/add-business-rules">
				<button class="btn btn-primary mb-3">Create Model</button>
			</router-link>
		</div>

		<table class="table table-hover align-middle shadow-sm">
			<thead class="table-primary">
				<tr>
					<th>Name</th>
					<th>Description</th>
					<th>Tags</th>

					<th class="text-center">Actions</th>
				</tr>
			</thead>
			<tbody v-if="isSelected === 'active'">
				<tr v-for="rule in businessRules">
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
						!businessRules ||
						(businessRules && businessRules.length === 0)
					"
				>
					<td colspan="6" class="text-center text-muted py-3">
						No Business Rules Available
					</td>
				</tr>
			</tbody>
			<tbody v-else>
				<tr v-for="rule in archivedRules">
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
						!archivedRules ||
						(archivedRules && archivedRules.length === 0)
					"
				>
					<td colspan="6" class="text-center text-muted py-3">
						No Archived Business Rules Available
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
		return { isSelected: "active" };
	},

	computed: {
		...mapGetters("BusinessRule", ["filteredRules", "getArchivedRules"]),
		businessRules() {
			return this.filteredRules;
		},

		archivedRules() {
			return this.getArchivedRules;
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
	margin-top: 6rem;
	margin-left: 14rem;
	margin-right: 1rem;
	height: calc(100vh - 8rem);

	padding: 1rem 1rem 0 1rem;

	border: 1px solid #e5e7eb;
	border-radius: 10px;

	height: calc(100vh - 7rem);
}
.table {
	border-radius: 10px;
	overflow: hidden;
}
td,
th {
	vertical-align: middle;
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

	background-color: #2563eb;
	box-shadow: 0 4px 10px rgba(76, 92, 117, 0.4);
	border-radius: 9px;
}
.action {
	border: 0.5px solid rgb(202, 202, 202) !important;
	border-radius: 50% !important;
	margin: 3px;
	padding: 5px;
}
</style>

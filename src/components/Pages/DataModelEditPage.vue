<template>
	<div class="data-model-edit">
		<section class="left-panel">
			<DataModelsForm />
		</section>

		<section class="right-panel">
			<div class="rules-header">
				<h5>
					Business Rules
					<span v-if="rules.length" class="badge">
						{{ rules.length }}
					</span>
				</h5>
			</div>

			<div class="rules-body">
				<table v-if="!loadingRules && rules.length" class="rules-table">
					<thead>
						<tr>
							<th>Rule Name</th>
							<th class="text-end">Updated At</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="rule in rules" :key="rule.uuid">
							<td>
								<router-link
									:to="`/admin/business-rules/${rule.uuid}/overview`"
									class="view-link"
								>
									{{ rule.name }}
								</router-link>
							</td>
							<td class="text-end">{{ rule.updated_at }}</td>
						</tr>
					</tbody>
				</table>

				<div v-else-if="loadingRules" class="empty-state">
					Loading business rules...
				</div>

				<div v-else class="empty-state">
					No business rules linked to this data model
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import DataModelsForm from "../forms/dataModelsForm.vue";
import { mapActions } from "vuex";
import toastService from "../../service/toastService";

export default {
	components: { DataModelsForm },

	data() {
		return {
			rules: [],
			loadingRules: false,
		};
	},

	async mounted() {
		if (this.$route.params.uuid) {
			await this.loadRules();
		}
	},

	methods: {
		...mapActions("DataModel", ["getRulesByModelId"]),

		async loadRules() {
			this.loadingRules = true;

			const res = await this.getRulesByModelId({
				uuid: this.$route.params.uuid,
			});

			if (res.success) {
				this.rules = res.data;
			} else {
				toastService.error("Failed to load business rules");
			}

			this.loadingRules = false;
		},
	},
};
</script>

<style scoped>
.data-model-edit {
	display: flex;
	gap: 1rem;
	height: calc(100vh - var(--header-height));
	background: #f5f7fa;
}

.left-panel {
	flex: 2;
	background: #ffffff;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	overflow-y: auto;
}

.right-panel {
	flex: 1;
	background: #ffffff;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
}

.rules-header {
	padding: 1rem;
	border-bottom: 1px solid #e5e7eb;
	font-weight: 600;
}
.rules-table {
	width: 100%;
	border-collapse: collapse;
	font-size: 0.9rem;
}

.rules-table thead {
	background: #f9fafb;
}

.rules-table th,
.rules-table td {
	padding: 0.6rem 0.75rem;
	border-bottom: 1px solid #e5e7eb;
	text-align: left;
}

.rules-table th {
	font-weight: 600;
	color: #374151;
	font-size: 0.85rem;
	text-transform: uppercase;
}

.rules-table tr:hover {
	background: #f8fafc;
}

.text-end {
	text-align: right;
}

.view-link {
	font-size: 0.85rem;
	color: #2563eb;
	text-decoration: none;
}

.view-link:hover {
	text-decoration: underline;
}

.badge {
	background: #2563eb;
	color: #fff;
	border-radius: 12px;
	padding: 2px 8px;
	font-size: 1rem;
	margin-left: 6px;
}

@media (max-width: 992px) {
	.data-model-edit {
		flex-direction: column;
	}

	.left-panel,
	.right-panel {
		flex: unset;
		height: auto;
	}
}
</style>

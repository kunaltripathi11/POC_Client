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
						<button class="btn btn-sm me-2" @click="editRule(rule)">
							<font-awesome-icon
								icon="fa-solid fa-pen"
								style="color: blue"
							/>
						</button>
						<button class="btn btn-sm" @click="deleteRule(rule)">
							<font-awesome-icon
								icon="fa-solid fa-trash"
								style="color: red"
							/>
						</button>
					</td>
				</tr>
				<tr v-if="businessRules.length === 0">
					<td colspan="6" class="text-center text-muted py-3">
						No Business Rules Available
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			businessRules: [],
		};
	},
	async mounted() {
		await this.fetchRules();
	},
	methods: {
		async fetchRules() {
			try {
				const response = await fetch(
					"http://localhost:3000/admin/business-rules"
				);
				const json = await response.json();
				this.businessRules = json.data;
			} catch (err) {
				console.error("Error loading Business Rules", err);
			}
		},
		// editRule(cat) {
		// 	this.$router.push(`/admin/business-rules/${dash.uuid}`);
		// },
		async deleteRule(rule) {
			if (!confirm("Sure? This will hide the Business Rules.")) return;

			await fetch(
				`http://localhost:3000/admin/business-rules/${rule.uuid}`,
				{
					method: "DELETE",
				}
			);
			this.fetchRules();
		},
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

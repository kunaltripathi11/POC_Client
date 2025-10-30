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
						<button
							class="btn btn-sm me-2 action"
							@click="editSolCategory(cat)"
						>
							<font-awesome-icon
								icon="fa-solid fa-pen"
								style="color: blue"
							/>
						</button>
						<button
							class="btn btn-sm action"
							@click="deleteSolCategory(cat)"
						>
							<font-awesome-icon
								icon="fa-solid fa-trash"
								style="color: red"
							/>
						</button>
					</td>
				</tr>
				<tr v-if="solCategory.length === 0">
					<td colspan="6" class="text-center py-3">
						No Solution Category Available
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
			solCategory: [],
		};
	},
	async mounted() {
		await this.fetchSolCategory();
	},
	methods: {
		async fetchSolCategory() {
			try {
				const response = await fetch(
					"http://localhost:3000/admin/application/solution-categories"
				);
				const json = await response.json();
				this.solCategory = json.data;
			} catch (err) {
				console.error("Error loading Category", err);
			}
		},
		// editSolCategory(cat) {
		// 	this.$router.push(`/admin/application/categories/${dash.uuid}`);
		// },
		async deleteSolCategory(app) {
			if (!confirm("Sure? This will hide the Category.")) return;
			await fetch(
				`http://localhost:3000/admin/application/solution-categories/${app.uuid}`,
				{
					method: "DELETE",
				}
			);
			this.fetchSolCategory();
		},
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

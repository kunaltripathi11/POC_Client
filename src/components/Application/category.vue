<template>
	<div class="main-content container mt-4">
		<div style="display: flex; justify-content: space-between">
			<h3 class="fw-bold mb-3"><Filter></Filter></h3>
			<!-- <button class="btn btn-primary mb-3">Create Dashboard</button> -->
		</div>
		<table class="table table-hover align-middle shadow-sm">
			<thead class="table-primary">
				<tr>
					<th>ID</th>
					<th>Solution Category</th>
					<th>Category</th>
					<th>Display Order</th>
					<th class="text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="cat in category">
					<td>{{ cat.id }}</td>
					<td>{{ cat.title }}</td>
					<td>{{ cat.category_name }}</td>
					<td>{{ cat.display_order }}</td>

					<td class="text-center">
						<button
							class="btn btn-sm btn-outline-primary me-2"
							@click="editCategory(cat)"
						>
							<font-awesome-icon icon="fa-solid fa-pen" />
						</button>
						<button
							class="btn btn-sm btn-outline-danger"
							@click="deleteCategory(app)"
						>
							<font-awesome-icon icon="fa-solid fa-trash" />
						</button>
					</td>
				</tr>
				<tr v-if="category.length === 0">
					<td colspan="6" class="text-center text-muted py-3">
						No Category Available
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import Filter from "./filter.vue";

export default {
	components: {
		Filter,
	},
	data() {
		return {
			category: [],
		};
	},
	async mounted() {
		await this.fetchCategory();
	},
	methods: {
		async fetchCategory() {
			try {
				const response = await fetch(
					"http://localhost:3000/admin/application/categories"
				);
				const json = await response.json();
				this.category = json.data;
			} catch (err) {
				console.error("Error loading Category", err);
			}
		},
		// editCategory(cat) {
		// 	this.$router.push(`/admin/application/categories/${dash.uuid}`);
		// },
		async deleteCategory(app) {
			if (!confirm("Sure? This will hide the Category.")) return;
			await fetch(
				`http://localhost:3000/admin/application/categories/${app.uuid}`,
				{
					method: "DELETE",
				}
			);
			this.fetchCategory();
		},
	},
};
</script>
<style scoped>
.main-content {
	padding-top: 4rem;
	/* border: 1px solid black;
	box-shadow: 2px black; */
}
.table {
	border-radius: 10px;
	overflow: hidden;
}
td,
th {
	vertical-align: middle;
}
</style>

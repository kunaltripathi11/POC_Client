<template>
	<div class="main">
		<div class="header">
			<div class="back">
				<router-link to="/admin/application/categories">
					<font-awesome-icon icon="fa-solid fa-arrow-left" />
					<span>Back to Dashboard</span></router-link
				>
			</div>
			<div class="heading">
				<h2 class="fw-semibold">Add Category</h2>
			</div>
		</div>
		<form @submit.prevent="onSubmit" novalidate>
			<div class="mb-3">
				<label class="form-label"
					>Category Name <span class="text-danger">*</span></label
				>
				<input
					type="text"
					class="form-control"
					v-model.trim="form.category_name"
					@blur="checkLocalDuplicate"
					:class="{ 'is-invalid': errors.category_name }"
					placeholder="e.g. Analytics"
				/>
				<div class="invalid-feedback" v-if="errors.category_name">
					{{ errors.category_name }}
				</div>
			</div>

			<div class="mb-3">
				<label class="form-label">Display Order</label>
				<input
					type="number"
					class="form-control"
					v-model.number="form.display_order"
					placeholder="e.g. 10"
					min="0"
				/>
			</div>

			<searchable-dropdown
				label="Solution Category"
				placeholder="Solution Categories ..."
				v-model="form.solution_category_id"
				:options="solutionCategory"
			>
			</searchable-dropdown>
			<div class="d-flex">
				<button class="btn btn-primary" :disabled="submitting">
					Create Category
				</button>
				<button
					type="button"
					class="btn btn-outline-secondary"
					@click="$emit('cancel')"
				>
					Cancel
				</button>
			</div>
			<div class="text-danger mt-3" v-if="formError">
				{{ formError }}
			</div>
		</form>
	</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SearchableDropdown from "../Layout/searchableDropdown.vue";

export default {
	data() {
		return {
			form: {
				category_name: this.value?.category_name || "",
				display_order: this.value?.display_order ?? null,
				solution_category_id: this.value?.solution_category_id ?? null,
			},
			errors: {},
			formError: "",
			submitting: false,
		};
	},
	components: {
		SearchableDropdown,
	},
	methods: {
		...mapActions("SolCategory", ["fetchSolCategory"]),
		...mapActions("Category", ["createCategory", "fetchCategory"]),

		validate() {
			this.errors = {};
			if (!this.form.category_name) {
				this.errors.category_name = "Category name is required";
			}
			return Object.keys(this.errors).length === 0;
		},

		checkLocalDuplicate() {
			const name = (this.form.category_name || "").toLowerCase();
			if (!name) return;
			if (this.categoryNameSet.includes(name)) {
				this.errors.category_name = "Name Already Present";
			} else if (this.errors.categoryNameSet === "Name Already Present") {
				this.errors.category_name = "";
			}
		},

		async onSubmit() {
			try {
				this.formError = "";
				if (!this.validate()) return;
				this.checkLocalDuplicate();
				if (this.errors.category_name) return;

				this.submitting = true;
				const payload = {
					category_name: this.form.category_name,
					display_order: this.form.display_order || null,
					sol_category_id: this.form.solution_category_id,
				};

				console.log(payload);

				await this.createCategory(payload);

				await this.fetchCategory();

				this.form.category_name = "";
				this.form.display_order = null;
				this.form.solution_category_id = null;
			} catch (error) {
				this.formError = error.message || "Something went wrong";
			} finally {
				this.submitting = false;
			}
		},
	},

	async mounted() {
		await this.fetchCategory();
		await this.fetchSolCategory();
	},
	computed: {
		...mapGetters("SolCategory", ["filteredSolCategory"]),
		...mapGetters("Category", ["filteredCategory"]),
		solutionCategory() {
			return this.filteredSolCategory.map((sc) => ({
				value: sc.id,
				label: sc.title,
			}));
		},
		categoryNameSet() {
			const list = Array.isArray(this.filteredCategory)
				? this.filteredCategory
				: [];
			console.log(list);

			const uniqueCategories = new Set(list);

			return Array.from(uniqueCategories).map((c) =>
				(c.category_name || "").trim().toLowerCase()
			);
		},
	},
};
</script>
<style scoped>
a {
	text-decoration: none;
}
.main {
	padding: 1rem 0 0 1rem;
	margin-left: 13rem;
	margin-top: 4rem;
	width: calc(100vw - 13rem);
	height: calc(100vh - 4rem);
	background: #f8fcff;
	border: 1px solid #e5e7eb;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

.header {
	border: 1px solid gray;
	/* border-radius: 10px; */
	/* margin: 0.7rem; */

	.back {
		width: 100%;
		border-bottom: 1px solid black;
		padding: 0.7rem;
	}
	.heading {
		padding: 0.4rem;
	}
}
</style>

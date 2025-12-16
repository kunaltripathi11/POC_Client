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
import toastService from "../../service/toastService";

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
		...mapActions("Category", [
			"createCategory",
			"fetchCategory",
			"updateCategory",
		]),

		validate() {
			this.errors = {};
			if (!this.form.category_name) {
				this.errors.category_name = "Category name is required";
			}
			return Object.keys(this.errors).length === 0;
		},

		checkLocalDuplicate() {
			const name = (this.form.category_name || "").toLowerCase();
			let nameSet = this.categoryNameSet;
			if (!name) return;

			if (this.isEdit) {
				nameSet = nameSet.filter(
					(cat) =>
						cat !== this.selected.category_name.toLowerCase().trim()
				);
			}

			if (nameSet.includes(name)) {
				this.errors.category_name = "Name Already Present";
			} else if (this.errors.category_name === "Name Already Present") {
				this.errors.category_name = "";
			}
		},

		async onSubmit() {
			try {
				this.formError = "";
				if (!this.validate()) {
					toastService.warning("Enter the corret data");
					return;
				}
				this.checkLocalDuplicate();
				if (this.errors.category_name) return;

				this.submitting = true;

				const payload = {
					category_name: this.form.category_name,
					display_order: this.form.display_order || null,
					sol_category_id: this.form.solution_category_id,
				};

				console.log(payload);
				if (!this.isEdit) {
					const result = await this.createCategory(payload);
					if (result.success) {
						this.successMessage = "Category created successfully!";

						toastService.success(this.successMessage);

						this.$router.replace("/admin/application/categories");
					} else {
						this.generalError =
							result.error ||
							"Failed to create solution category";
						toastService.error("Failed To create  Category");
					}
				} else {
					const result = await this.updateCategory({
						payload,
						uuid: this.$route.params.uuid,
					});

					if (result.success) {
						toastService.success("Category Updated Successfully");

						this.$router.replace("/admin/application/categories");
					} else {
						this.generalError =
							result.error || "Failed to Update category";
						toastService.error("Failed To Update  Category");
					}
				}

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

		if (this.isEdit) {
			this.form.category_name = this.selected.category_name;
			this.form.display_order = this.selected.display_order;
			this.form.solution_category_id = this.selected.solution_category_id;
		}
	},
	computed: {
		...mapGetters("SolCategory", ["filteredSolCategory"]),
		...mapGetters("Category", ["filteredCategory"]),

		isEdit() {
			return !!this.$route.params.uuid;
		},
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
		selected() {
			return this.$store.getters.getSelected;
		},
	},
};
</script>
<style scoped>
a {
	text-decoration: none;
}

.main {
	padding: 1rem 2rem 0 2rem;
	width: 100%;
	height: calc(100vh - var(--header-height));
	background: #f8fcff;
	border: 1px solid #e5e7eb;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
	overflow-y: auto;
}

.header {
	border: 1px solid gray;
}

.back {
	width: 100%;
	border-bottom: 1px solid black;
	padding: 0.7rem;
}

.heading {
	padding: 0.4rem;
}

form {
	padding: 1.5rem;
	max-width: 48vw;
}
</style>

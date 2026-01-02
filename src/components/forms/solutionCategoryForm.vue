<template>
	<div class="main">
		<div class="header">
			<div class="back">
				<router-link to="/admin/application/solution-categories">
					<font-awesome-icon icon="fa-solid fa-arrow-left" />
					<span>Back to Dashboard</span>
				</router-link>
			</div>
			<div class="heading">
				<h2 class="fw-semibold">
					{{
						isEdit
							? "Update Solution Category"
							: "Create Solution Category"
					}}
				</h2>
			</div>
		</div>

		<form @submit.prevent="onSubmit">
			<div class="mb-4">
				<p class="text-muted">
					Enter Unique title for Solution Category
				</p>
			</div>
			<div>
				<input
					id="title"
					type="text"
					v-model.trim="formdata.title"
					placeholder="Enter Title *"
					class="form-control"
					:class="{ 'is-invalid': errors.title }"
					@input="clearError"
				/>
			</div>
			<div v-if="errors.title" class="invalid-feedback d-block">
				{{ errors.title }}
			</div>

			<div v-if="successMessage" class="alert alert-success mt-3">
				{{ successMessage }}
			</div>
			<!-- <div v-if="generalError" class="alert alert-danger mt-3">
				{{ generalError }}
			</div> -->

			<div class="p-2">
				<button
					type="submit"
					class="btn btn-primary p-2 px-4"
					:disabled="isSubmitting"
				>
					{{
						isSubmitting
							? "Submitting..."
							: isEdit
							? "Update Sol Category"
							: "Create Sol Category"
					}}
				</button>
				<button
					type="button"
					class="btn btn-secondary p-2 px-4 m-1"
					@click="cancel"
					:disabled="isSubmitting"
				>
					Cancel
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import toastService from "../../service/toastService";

export default {
	data() {
		return {
			formdata: {
				title: "",
			},
			errors: {
				title: "",
			},
			isSubmitting: false,
			successMessage: "",
			generalError: "",
		};
	},

	computed: {
		...mapGetters("SolCategory", ["filteredSolCategory"]),

		isEdit() {
			return !!this.$route.params.uuid;
		},
	},

	async mounted() {
		await this.fetchSolCategory();

		if (this.isEdit) {
			const solCategory = this.filteredSolCategory.find(
				(solCategory) => solCategory.uuid === this.$route.params.uuid
			);
			this.formdata.title = solCategory.title;
		}
	},

	methods: {
		...mapActions("SolCategory", [
			"fetchSolCategory",
			"createSolCategory",

			"updateSolCategory",
		]),
		validateForm() {
			this.errors.title = "";
			let isValid = true;

			if (!this.formdata.title) {
				this.errors.title = "Title is required";
				isValid = false;
			} else if (this.formdata.title.length < 3) {
				this.errors.title = "Title must be at least 3 characters long";
				isValid = false;
			} else if (this.formdata.title.length > 100) {
				this.errors.title = "Title must not exceed 100 characters";
				isValid = false;
			}

			return isValid;
		},

		clearError() {
			this.errors.title = "";
			this.generalError = "";
		},

		async onSubmit() {
			this.successMessage = "";
			this.generalError = "";

			if (!this.validateForm()) {
				toastService.warning("Enter the correct data");
				return;
			}

			this.isSubmitting = true;

			try {
				const payload = {
					title: this.formdata.title,
				};
				let result;
				if (!this.isEdit) {
					result = await this.createSolCategory(payload);
					if (result.success) {
						this.resetForm();
						this.$router.replace(
							"/admin/application/solution-categories"
						);
					} else {
						this.generalError =
							result.error ||
							"Failed to create solution category";
					}
				} else {
					result = await this.updateSolCategory({
						payload: payload,
						uuid: this.$route.params.uuid,
					});

					this.resetForm();
					this.$router.replace(
						"/admin/application/solution-categories"
					);
				}
				console.log("Result in Sol", result);
			} catch (error) {
				console.error("Error creating solution category:", error);
				this.generalError =
					error.message ||
					"An error occurred while creating the solution category";
			} finally {
				this.isSubmitting = false;
			}
		},

		resetForm() {
			this.formdata.title = "";
			this.errors.title = "";
			this.successMessage = "";
			this.generalError = "";
		},
		cancel() {
			this.$router.replace("/admin/application/solution-categories");
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
	border: 1px solid #e5e7eb;

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

.heading {
	padding: 0.4rem;
}

.invalid-feedback {
	color: #dc3545;
	font-size: 0.875rem;
	margin-top: 0.25rem;
}

.is-invalid {
	border-color: #dc3545;
}

.is-invalid:focus {
	border-color: #dc3545;
	box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
</style>

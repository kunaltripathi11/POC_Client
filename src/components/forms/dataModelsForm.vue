<template>
	<div class="main">
		<div class="header">
			<div class="back">
				<router-link to="/admin/data-model">
					<font-awesome-icon icon="fa-solid fa-arrow-left" />
					<span>Back to Data Model</span>
				</router-link>
			</div>
			<div class="heading">
				<h2 class="fw-semibold">
					{{ isEdit ? "Update Data Model" : "Add Data Model" }}
				</h2>
			</div>
		</div>
		<form @submit.prevent="onSubmit" novalidate>
			<div class="mb-3">
				<label class="form-label">
					Model Name <span class="text-danger">*</span>
				</label>
				<input
					type="text"
					class="form-control"
					v-model.trim="form.name"
					@blur="checkUniqueName"
					:class="{ 'is-invalid': errors.name }"
					placeholder="Model Name..."
					@input="clearError('name')"
				/>
				<div class="invalid-feedback" v-if="errors.name">
					{{ errors.name }}
				</div>
			</div>

			<div class="mb-3">
				<label class="form-label"> Description </label>
				<textarea
					rows="5"
					cols="10"
					type="text"
					class="form-control"
					v-model.trim="form.description"
					:class="{ 'is-invalid': errors.description }"
				></textarea>
				<div class="invalid-feedback" v-if="errors.description">
					{{ errors.description }}
				</div>
			</div>
			<div class="mb-3">
				<label class="form-label"> Primary Key </label>
				<input
					type="text"
					class="form-control"
					v-model.trim="form.primary_key"
					:class="{ 'is-invalid': errors.primary_key }"
				/>
				<div class="invalid-feedback" v-if="errors.primary_key">
					{{ errors.primary_key }}
				</div>
			</div>
			<div class="mb-3">
				<label class="form-label">
					App Package <span class="text-danger">*</span>
				</label>
				<input
					type="text"
					class="form-control"
					v-model.trim="form.app_package"
					:class="{ 'is-invalid': errors.app_package }"
					placeholder="e.g. com.example.app"
					@input="clearError('app_package')"
				/>
				<div class="invalid-feedback" v-if="errors.app_package">
					{{ errors.app_package }}
				</div>
			</div>
			<p>
				* In case the data model is based on a Object, It has to include
				UUID of the record and use it as primary key. While creating the
				data model, any comments submitted will be cleared.
			</p>

			<div class="mb-3">
				<label class="form-label">
					Data Model <span class="text-danger">*</span>
				</label>
				<textarea
					rows="5"
					cols="10"
					type="text"
					class="form-control"
					v-model.trim="form.query"
					:class="{ 'is-invalid': errors.query }"
					@input="clearError('query')"
				></textarea>
				<div class="invalid-feedback" v-if="errors.query">
					{{ errors.query }}
				</div>
			</div>

			<div class="d-flex gap-2">
				<button
					type="submit"
					class="btn btn-primary"
					:disabled="submitting"
				>
					{{ isEdit ? "Update Model" : "Create Model" }}
				</button>
				<button
					type="button"
					class="btn btn-outline-secondary"
					@click="handleCancel"
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
import toastService from "../../service/toastService";

export default {
	data() {
		return {
			form: {
				name: "",
				primary_key: "",
				app_package: "",
				query: "",
				description: "",
			},
			errors: {},
			formError: "",
			submitting: false,
			model: {},
		};
	},

	async mounted() {
		await this.fetchModels();

		if (this.isEdit) {
			this.model = this.filteredModel.find(
				(model) => model.uuid === this.$route.params.uuid
			);

			this.form.name = this.model.name;
			this.form.primary_key = this.model.primary_key;
			this.form.app_package = this.model.app_package;
			this.form.query = this.model.query;
			this.form.description = this.model.description;
		}
	},

	methods: {
		...mapActions("DataModel", [
			"fetchModels",
			"createModel",
			"updateModel",
		]),

		validate() {
			this.errors = {};
			if (!this.form.name) {
				this.errors.name = "Model name is required";
			}
			if (!this.form.app_package) {
				this.errors.app_package = "Application Package is required";
			}
			if (!this.form.query) {
				this.errors.query = "Data Model Query is required";
			}

			return Object.keys(this.errors).length === 0;
		},

		async checkUniqueName() {
			const name = (this.form.name || "").trim().toLowerCase();

			if (!name) return;
			if (this.modelNameSet.includes(name)) {
				this.errors.name = "Name Already Present";
			} else if (this.errors.name === "Name Already Present") {
				this.errors.name = "";
			}
		},

		async onSubmit() {
			try {
				this.formError = "";
				if (!this.validate()) {
					toastService.warning("Enter Correct Data");
					return;
				}

				await this.checkUniqueName();
				if (this.errors.title) return;

				this.submitting = true;

				const payload = {
					name: this.form.name,
					primary_key: this.form.primary_key,
					app_package: this.form.app_package,
					query: this.form.query,
					description: this.form.description,
				};
				if (this.isEdit) {
					const result = await this.updateModel({
						payload: payload,
						uuid: this.$route.params.uuid,
					});

					if (result.success) {
						this.$router.replace("/admin/data-model");
					} else {
						this.generalError =
							result.error ||
							"Failed to updated solution category";
					}
				} else {
					const result = await this.createModel(payload);
					if (result.success) {
						this.$router.replace("/admin/data-model");
					} else {
						this.generalError =
							result.error ||
							"Failed to create solution category";
					}
				}

				this.form = {
					name: "",
					primary_key: "",
					app_package: "",
					query: "",
					description: "",
				};
			} catch (error) {
				this.formError = error.message || "Something went wrong";
			} finally {
				this.submitting = false;
			}
		},

		handleCancel() {
			this.$router.push("/admin/data-model");
		},
	},

	computed: {
		...mapGetters("DataModel", ["filteredModel"]),

		modelNameSet() {
			const list = Array.isArray(this.filteredModel)
				? this.filteredModel
				: [];
			console.log("list", list);

			const uniqueApps = new Set(list);
			let nameSet = Array.from(uniqueApps).map((c) =>
				(c.name || "").trim().toLowerCase()
			);
			if (this.isEdit) {
				nameSet = nameSet.filter(
					(name) => name !== this.model.name.toLowerCase().trim()
				);
			}
			return nameSet;
		},
		isEdit() {
			return !!this.$route.params.uuid;
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

.gap-2 {
	gap: 0.5rem;
}

.placeholder-text {
	color: #6c757d;
}
</style>

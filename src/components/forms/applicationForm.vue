<template>
	<div class="main">
		<div class="header">
			<div class="back">
				<router-link to="/admin/application/apps">
					<font-awesome-icon icon="fa-solid fa-arrow-left" />
					<span>Back to Applications</span>
				</router-link>
			</div>
			<div class="heading">
				<h2 class="fw-semibold">Add Application</h2>
			</div>
		</div>
		<form @submit.prevent="onSubmit" novalidate>
			<div class="mb-3">
				<label class="form-label">
					Application Name <span class="text-danger">*</span>
				</label>
				<input
					type="text"
					class="form-control"
					v-model.trim="form.title"
					@blur="checkUniqueName"
					:class="{ 'is-invalid': errors.title }"
					placeholder="e.g. Analytics Dashboard"
				/>
				<div class="invalid-feedback" v-if="errors.title">
					{{ errors.title }}
				</div>
			</div>

			<searchable-dropdown
				label="Category"
				placeholder="Select Category..."
				v-model="form.category_id"
				:options="categoryOptions"
			>
			</searchable-dropdown>

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
				/>
				<div class="invalid-feedback" v-if="errors.app_package">
					{{ errors.app_package }}
				</div>
			</div>

			<div class="mb-3">
				<label class="form-label">Icon</label>
				<div class="icon-selector">
					<div
						class="selected-icon"
						@click="showIconPicker = !showIconPicker"
					>
						<span class="material-icons" v-if="form.icon">
							{{ form.icon }}
						</span>
						<span v-else class="placeholder-text">
							Select an icon
						</span>
					</div>
					<div class="icon-picker" v-if="showIconPicker">
						<div class="icon-search">
							<input
								type="text"
								class="form-control"
								v-model="iconSearch"
								placeholder="Search icons..."
							/>
						</div>
						<div v-if="loadingIcons" class="text-center py-3">
							<div
								class="spinner-border spinner-border-sm"
								role="status"
							>
								<span class="visually-hidden">Loading...</span>
							</div>
							<span class="ms-2">Loading icons...</span>
						</div>
						<div class="icon-grid" v-else>
							<div
								v-for="icon in visibleIcons"
								:key="icon"
								class="icon-item"
								:class="{ selected: form.icon === icon }"
								@click="selectIcon(icon)"
								:title="icon"
							>
								<span class="material-icons">{{ icon }}</span>
							</div>
						</div>
						<button
							type="button"
							class="btn btn-sm btn-outline-primary w-100 mt-2"
							@click="loadMoreIcons"
							v-if="hasMoreIcons"
							:disabled="loadingIcons"
						>
							{{ loadingIcons ? "Loading..." : "Load More" }}
						</button>
					</div>
				</div>
				<small class="form-text text-muted">
					Click to select a Material Icon
				</small>
			</div>

			<div class="mb-3 d-flex align-items-center justify-content-between">
				<label class="form-label mb-0">Active</label>
				<label class="switch">
					<input type="checkbox" v-model="form.active" />
					<span class="slider"></span>
				</label>
			</div>

			<div class="mb-3 d-flex align-items-center justify-content-between">
				<label class="form-label mb-0">Hide App</label>
				<label class="switch">
					<input type="checkbox" v-model="form.hide_app" />
					<span class="slider"></span>
				</label>
			</div>

			<div class="d-flex gap-2">
				<button
					type="submit"
					class="btn btn-primary"
					:disabled="submitting"
				>
					{{ isEdit ? "Update Application" : "Create Application" }}
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
import SearchableDropdown from "../Layout/searchableDropdown.vue";
import toastService from "../../service/toastService";

export default {
	components: {
		SearchableDropdown,
	},
	data() {
		return {
			form: {
				title: "",
				category_id: null,
				display_order: null,
				app_package: "",
				icon: "",
				active: true,
				hide_app: false,
			},
			errors: {},
			formError: "",
			submitting: false,
			showIconPicker: false,
			iconSearch: "",
			iconsPerPage: 30,
			currentIconIndex: 0,
			allMaterialIcons: [],
			loadingIcons: false,
		};
	},
	async mounted() {
		await this.fetchApplications();
		await this.fetchCategory();
		await this.fetchMaterialIcons();

		if (this.isEdit) {
			this.form.title = this.selectedApp.title;
			this.form.category_id = this.selectedApp.category_id;
			this.form.display_order = this.selectedApp.display_order;
			this.form.app_package = this.selectedApp.app_package;
			this.form.icon = this.selectedApp.icon;
			this.form.active = this.selectedApp.active;
			this.form.hide_app = this.selectedApp.hide_app;
		}
	},
	computed: {
		...mapGetters("Application", ["allApplications"]),
		...mapGetters("Category", ["filteredCategory"]),

		applicationNameSet() {
			const list = Array.isArray(this.allApplications)
				? this.allApplications
				: [];
			console.log(list);

			const uniqueApps = new Set(list);

			return Array.from(uniqueApps).map((c) =>
				(c.title || "").trim().toLowerCase()
			);
		},
		selectedApp() {
			return this.$store.getters.getSelected;
		},

		categoryOptions() {
			return this.filteredCategory.map((cat) => ({
				value: cat.id,
				label: cat.category_name,
			}));
		},
		isEdit() {
			return !!this.$route.params.uuid;
		},

		filteredMaterialIcons() {
			if (!this.iconSearch) {
				return this.allMaterialIcons;
			}
			const search = this.iconSearch.toLowerCase();
			return this.allMaterialIcons.filter((icon) =>
				icon.includes(search)
			);
		},

		visibleIcons() {
			return this.filteredMaterialIcons.slice(
				0,
				this.currentIconIndex + this.iconsPerPage
			);
		},

		hasMoreIcons() {
			return this.visibleIcons.length < this.filteredMaterialIcons.length;
		},
	},
	methods: {
		...mapActions("Application", [
			"fetchApplications",
			"createApplications",
			"updateApplication",
		]),
		...mapActions("Category", ["fetchCategory"]),

		async fetchMaterialIcons() {
			try {
				this.loadingIcons = true;

				const response = await fetch(
					"https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints"
				);
				const text = await response.text();

				const icons = text
					.split("\n")
					.filter((line) => line.trim())
					.map((line) => line.split(" ")[0])
					.sort();

				this.allMaterialIcons = icons;
				this.currentIconIndex = 0;
			} catch (error) {
				console.error("Error fetching Material Icons:", error);
				this.formError = "Failed to load icons. Using fallback list.";
			} finally {
				this.loadingIcons = false;
			}
		},

		selectIcon(icon) {
			this.form.icon = icon;
			this.showIconPicker = false;
		},

		loadMoreIcons() {
			this.currentIconIndex += this.iconsPerPage;
		},

		validate() {
			this.errors = {};
			if (!this.form.title) {
				this.errors.title = "Application name is required";
			}
			if (!this.form.app_package) {
				this.errors.app_package = "App package is required";
			}
			return Object.keys(this.errors).length === 0;
		},

		async checkUniqueName() {
			const title = (this.form.title || "").trim().toLowerCase();
			let nameSet = this.applicationNameSet;
			console.log("NAMESET ", nameSet);
			if (!title) return;
			if (this.isEdit) {
				console.log("title", title);

				nameSet = nameSet.filter(
					(app) => app !== this.selectedApp.title.toLowerCase().trim()
				);
			}

			if (nameSet.includes(title)) {
				this.errors.title = "Name Already Present";
			} else if (this.errors.title === "Name Already Present") {
				this.errors.title = "";
			}
		},

		async onSubmit() {
			try {
				this.formError = "";
				if (!this.validate()) return;

				await this.checkUniqueName();
				if (this.errors.title) return;

				this.submitting = true;

				const payload = {
					title: this.form.title,
					category_id: this.form.category_id,
					display_order: this.form.display_order,
					app_package: this.form.app_package,
					icon: this.form.icon,
					active: this.form.active,
					hide_app: this.form.hide_app,
				};
				if (this.isEdit) {
					const result = await this.updateApplication({
						uuid: this.$route.params.uuid,
						payload: payload,
					});
					if (result.success) {
						this.successMessage =
							"Application updated successfully!";

						toastService.success(this.successMessage);

						this.$router.replace("/admin/application/apps");
					} else {
						this.generalError =
							result.error || "Failed to update Application";
						toastService.error("Failed To update Application");
					}
				} else {
					const result = await this.createApplications(payload);

					if (result.success) {
						this.successMessage =
							"Application created successfully!";

						toastService.success(this.successMessage);

						this.$router.replace("/admin/application/apps");
					} else {
						this.generalError =
							result.error || "Failed to create Application";
						toastService.error("Failed To create Application");
					}
				}

				this.form = {
					title: "",
					category_id: null,
					display_order: null,
					app_package: "",
					icon: "",
					active: true,
					hide_app: false,
				};
			} catch (error) {
				this.formError = error.message || "Something went wrong";
			} finally {
				this.submitting = false;
			}
		},

		handleCancel() {
			this.$router.push("/admin/application/apps");
		},
	},
	watch: {
		iconSearch() {
			this.currentIconIndex = 0;
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

.gap-2 {
	gap: 0.5rem;
}

.switch {
	position: relative;
	display: inline-block;
	width: 50px;
	height: 24px;
}

.switch input {
	opacity: 0;
	width: 0;
	height: 0;
}

.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	transition: 0.4s;
	border-radius: 24px;
}

.slider:before {
	position: absolute;
	content: "";
	height: 18px;
	width: 18px;
	left: 3px;
	bottom: 3px;
	background-color: white;
	transition: 0.4s;
	border-radius: 50%;
}

input:checked + .slider {
	background-color: #0d6efd;
}

input:checked + .slider:before {
	transform: translateX(26px);
}

.icon-selector {
	position: relative;
}

.selected-icon {
	border: 1px solid #ced4da;
	border-radius: 0.375rem;
	padding: 0.75rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 60px;
	background-color: white;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.selected-icon:hover {
	border-color: #86b7fe;
	box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.selected-icon .material-icons {
	font-size: 32px;
	color: #495057;
}

.placeholder-text {
	color: #6c757d;
}

.icon-picker {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background: white;
	border: 1px solid #ced4da;
	border-radius: 0.375rem;
	padding: 1rem;
	z-index: 1000;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
	max-height: 400px;
	overflow-y: auto;
}

.icon-search {
	margin-bottom: 1rem;
}

.icon-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
	gap: 0.5rem;
}

.icon-item {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.75rem;
	border: 1px solid #dee2e6;
	border-radius: 0.375rem;
	cursor: pointer;
	transition: all 0.2s;
	background-color: white;
}

.icon-item:hover {
	background-color: #f8f9fa;
	border-color: #0d6efd;
}

.icon-item.selected {
	background-color: #0d6efd;
	border-color: #0d6efd;
	color: white;
}

.icon-item .material-icons {
	font-size: 24px;
}

.icon-item.selected .material-icons {
	color: white;
}
</style>

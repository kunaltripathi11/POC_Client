<template>
	<div class="main">
		<div class="header">
			<div class="back">
				<router-link to="/admin/dashboard">
					<font-awesome-icon icon="fa-solid fa-arrow-left" />
					<span>Back to Dashboard</span>
				</router-link>
			</div>
			<div class="heading">
				<h2 class="fw-semibold">
					{{ isEdit ? "Add Dashboard" : "Update Dashboard" }}
				</h2>
			</div>
		</div>
		<form @submit.prevent="onSubmit" novalidate>
			<div class="mb-3">
				<label class="form-label">
					Name <span class="text-danger">*</span>
				</label>
				<input
					type="text"
					class="form-control"
					v-model.trim="form.name"
					@blur="checkUnique"
					:class="{ 'is-invalid': errors.name }"
					placeholder="Enter Name..."
				/>
				<div class="invalid-feedback" v-if="errors.name">
					{{ errors.name }}
				</div>
			</div>
			<div class="mb-3">
				<label class="form-label">
					Title <span class="text-danger">*</span>
				</label>
				<input
					type="text"
					class="form-control"
					v-model.trim="form.title"
					@blur="checkUnique"
					:class="{ 'is-invalid': errors.title }"
					placeholder="Enter Title..."
				/>
				<div class="invalid-feedback" v-if="errors.title">
					{{ errors.title }}
				</div>
			</div>

			<div class="mb-3">
				<label class="form-label">
					url <span class="text-danger">*</span>
				</label>
				<input
					type="text"
					class="form-control"
					v-model.trim="form.url"
					:class="{ 'is-invalid': errors.url }"
					@blur="checkUnique"
					placeholder="/abc ..."
				/>
				<div class="invalid-feedback" v-if="errors.url">
					{{ errors.url }}
				</div>
			</div>
			<div class="mb-3 d-flex align-items-center justify-content-between">
				<label class="form-label mb-0">Create Application</label>
				<label class="switch">
					<input type="checkbox" v-model="form.create_app" />
					<span class="slider"></span>
				</label>
			</div>
			<div v-if="!form.create_app">
				<searchable-dropdown
					label="Application <span class='text-danger'>*</span>"
					placeholder="Select Application..."
					v-model="form.app_id"
					:options="applicationOptions"
				>
				</searchable-dropdown>
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
			</div>

			<div v-else>
				<div class="mb-3">
					<label class="form-label">
						Application Name <span class="text-danger">*</span>
					</label>
					<input
						type="text"
						class="form-control"
						v-model.trim="form.app_title"
						@blur="checkUnique"
						:class="{ 'is-invalid': errors.app_title }"
						placeholder="e.g. Analytics Dashboard"
					/>
					<div class="invalid-feedback" v-if="errors.app_title">
						{{ errors.title }}
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
									<span class="visually-hidden"
										>Loading...</span
									>
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
									<span class="material-icons">{{
										icon
									}}</span>
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
				</div>
			</div>
			<div class="mb-3 d-flex align-items-center justify-content-between">
				<label class="form-label mb-0"
					>Remove filter After Leaving</label
				>
				<label class="switch">
					<input type="checkbox" v-model="form.remove_filter" />
					<span class="slider"></span>
				</label>
			</div>
			<div class="d-flex gap-2">
				<button
					type="submit"
					class="btn btn-primary"
					:disabled="submitting"
				>
					{{ isEdit ? "Update Dashboard" : "Create Dashboard" }}
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
				name: "",
				url: "",
				app_id: "",
				remove_filter: false,
				display_order: null,
				create_app: false,
				app_title: "",
				app_package: "",
				icon: "",
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
		await this.fetchDashboards();
		await this.fetchApps();

		if (this.isEdit) {
			this.form.name = this.selectedDashboard.name;
			this.form.title = this.selectedDashboard.title;
			this.form.url = this.selectedDashboard.url;
			this.form.app_id = this.selectedDashboard.app_id;
			this.form.remove_filter = this.selectedDashboard.remove_filter;
			this.form.app_package = this.selectedDashboard.app_package;
		}
	},
	methods: {
		...mapActions("Application", ["createApplications"]),
		...mapActions("Dashboard", [
			"createDashboard",
			"fetchApps",
			"fetchDashboards",
			"updateDashboard",
		]),

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
			if (!this.form.name) {
				this.errors.name = "Dashboard name is required";
			}
			if (!this.form.title) {
				this.errors.title = "Dashboard title is required";
			}
			if (!this.form.url) {
				this.errors.url = "Dashboard url is required";
			} else if (!this.form.url.startsWith("/")) {
				this.errors.url = "Dashboard url is should start with /";
			}
			// console.log("length", this.form.url.length);
			else if (this.form.url.length < 2) {
				this.errors.url =
					"Dashboard url is should be atleast of 2 characters";
			}

			if (!this.form.app_package && this.form.create_app) {
				this.errors.app_package = "App package is required";
			}

			if (!this.form.create_app && !this.form.app_id) {
				this.errors.app_package = "Application is required";
			}

			return Object.keys(this.errors).length === 0;
		},

		async onSubmit() {
			try {
				this.formError = "";
				if (!this.validate()) {
					toastService.warning("Enter the correct data");
					return;
				}

				await this.checkUnique();
				if (this.errors.name || this.errors.url) return;

				this.submitting = true;

				const payload = {
					name: this.form.name,
					title: this.form.title,
					url: this.form.url,
					display_order: this.form.display_order,
					app_id: this.form.app_id,
					app_title: this.form.app_title,
					remove_filter: this.form.remove_filter,
					create_app: this.form.create_app,
					app_package: this.form.app_package,
					icon: this.form.icon,
				};

				if (this.isEdit) {
					const result = await this.updateDashboard({
						payload: payload,
						uuid: this.$route.params.uuid,
					});
					if (result.success) {
						this.successMessage = "Dashboard updated successfully!";

						toastService.success(this.successMessage);

						this.$router.replace("/admin/dashboard");
					} else {
						this.generalError =
							result.error || "Failed to update Dashboard";
						toastService.error("Failed To update Dashboard");
					}
				} else {
					const result = await this.createDashboard(payload);
					if (result.success) {
						this.successMessage = "Dashboard created successfully!";

						toastService.success(this.successMessage);

						this.$router.replace("/admin/dashboard");
					} else {
						this.generalError =
							result.error || "Failed to create Dashboard";
						toastService.error("Failed To create Dashboard");
					}
				}

				this.form = {
					title: "",
					name: "",
					url: "",
					remove_filter: false,
					create_app: false,
					app_package: "",
					icon: "",
				};
			} catch (error) {
				this.formError = error.message || "Something went wrong";
			} finally {
				this.submitting = false;
			}
		},

		handleCancel() {
			this.$router.push("/admin/dashboard");
		},
		async checkUnique() {
			const name = (this.form.name || "").trim().toLowerCase();
			const url = (this.form.url || "").trim().toLowerCase();
			const title = (this.form.title || "").trim().toLowerCase();

			if (!name && !url && !title) return;

			if (this.dashboardNameSet.nameSet?.includes(name)) {
				this.errors.name = "Name Already Present";
			} else if (this.errors.name === "Name Already Present") {
				this.errors.name = "";
			}
			if (this.dashboardNameSet.urlSet?.includes(url)) {
				this.errors.url = "URL Already Present";
			} else if (this.errors.url === "URL Already Present") {
				this.errors.url = "";
			}

			if (this.dashboardNameSet.titleSet?.includes(title)) {
				this.errors.title = "Title Already Present";
			} else if (this.errors.title === "Title Already Present") {
				this.errors.title = "";
			}
		},
	},

	computed: {
		...mapGetters("Dashboard", [
			"filteredDashboards",
			"filteredApplication",
		]),

		isEdit() {
			return !!this.$route.params.uuid;
		},

		selectedDashboard() {
			return this.$store.getters.getSelected;
		},

		dashboardNameSet() {
			const list = Array.isArray(this.filteredDashboards)
				? this.filteredDashboards
				: [];

			const uniqueApps = new Set(list);
			let nameSet = Array.from(uniqueApps).map((c) =>
				(c.name || "").trim().toLowerCase()
			);

			let titleSet = Array.from(uniqueApps).map((c) =>
				(c.title || "").trim().toLowerCase()
			);
			let urlSet = Array.from(uniqueApps).map((c) =>
				(c.url || "").trim().toLowerCase()
			);

			if (this.isEdit) {
				nameSet = nameSet.filter(
					(name) =>
						name !==
						this.selectedDashboard.name.toLowerCase().trim()
				);
				titleSet = titleSet.filter(
					(title) =>
						title !==
						this.selectedDashboard.title.toLowerCase().trim()
				);
				urlSet = urlSet.filter(
					(url) =>
						url !== this.selectedDashboard.url.toLowerCase().trim()
				);
			}

			const finalSet = {
				urlSet: urlSet,
				titleSet: titleSet,
				nameSet: nameSet,
			};

			return finalSet;
		},

		applicationOptions() {
			const apps = [...this.filteredApplication];

			if (this.isEdit && this.form.app_id) {
				const exists = apps.some(
					(a) => a.id === this.selectedDashboard.app_id
				);

				if (!exists) {
					const label = this.selectedDashboard.application;
					const value = this.selectedDashboard.app_id;

					apps.push(this.selectedDashboard);
				}
			}

			return apps.map((app) => ({
				value: app.id,
				label: app.title,
			}));
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

	watch: {
		iconSearch() {
			this.currentIconIndex = 0;
		},

		form: {
			async handler(newValue, oldValue) {
				if (newValue.create_app === true) {
					await this.fetchMaterialIcons();
				}
			},
			deep: true,
			immediate: true,
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
	margin-top: 0.5rem;
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

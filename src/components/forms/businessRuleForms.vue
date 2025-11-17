<template>
	<div class="main">
		<div class="header">
			<div class="back">
				<router-link to="/admin/business-rules">
					<font-awesome-icon icon="fa-solid fa-arrow-left" />
					<span>Back to Business Rules</span>
				</router-link>
			</div>
			<div class="heading">
				<h2 class="fw-semibold">Add Business Rule</h2>
			</div>
		</div>
		<form @submit.prevent="onSubmit" novalidate>
			<div class="mb-3">
				<label class="form-label">
					Rule Name <span class="text-danger">*</span>
				</label>
				<input
					type="text"
					class="form-control"
					v-model.trim="form.name"
					@blur="checkUniqueName"
					:class="{ 'is-invalid': errors.name }"
					placeholder="e.g. Sales Dashboard Rule"
				/>
				<div class="invalid-feedback" v-if="errors.name">
					{{ errors.name }}
				</div>
			</div>

			<div class="mb-3">
				<label class="form-label">Description</label>
				<textarea
					class="form-control"
					v-model.trim="form.description"
					rows="3"
					placeholder="Describe the purpose of this business rule..."
				></textarea>
			</div>

			<searchable-dropdown
				label="Data Model"
				placeholder="Select Data Model..."
				v-model="form.data_model_id"
				:options="dataModelOptions"
				required
				:error="errors.data_model_id"
			>
			</searchable-dropdown>

			<div class="mb-3">
				<label class="form-label">App Package</label>
				<input
					type="text"
					class="form-control"
					v-model.trim="form.app_package"
					placeholder="e.g. com.example.app"
				/>
			</div>

			<div class="mb-3">
				<label class="form-label">Workflow</label>
				<input
					type="text"
					class="form-control"
					v-model.trim="form.workflow"
					placeholder="e.g. approval_workflow"
				/>
			</div>

			<div class="mb-3">
				<label class="form-label">User Specific Field ID</label>
				<input
					type="text"
					class="form-control"
					v-model.trim="form.user_specific_field_id"
					placeholder="e.g. user_id"
				/>
			</div>

			<div class="mb-3">
				<label class="form-label">
					Multiple User Specific Field ID
				</label>
				<input
					type="text"
					class="form-control"
					v-model.trim="form.multiple_user_specific_field_id"
					placeholder="e.g. user_ids"
				/>
			</div>

			<div class="mb-3">
				<label class="form-label">Link To</label>
				<select
					class="form-select"
					v-model="form.link_to"
					@change="handleLinkToChange"
				>
					<option :value="null">None</option>
					<option value="dashboard">Dashboard</option>
					<option value="application">Application</option>
					<option value="report">Report</option>
				</select>
			</div>

			<searchable-dropdown
				v-if="form.link_to"
				label="Destination"
				placeholder="Select Destination..."
				v-model="form.destination_id"
				:options="destinationOptions"
				:required="form.link_to !== null"
				:error="errors.destination_id"
			>
			</searchable-dropdown>

			<div class="mb-3">
				<label class="form-label">Tags</label>
				<div class="tag-input-container">
					<div class="tags-display">
						<span
							v-for="(tag, index) in selectedTags"
							:key="index"
							class="tag-badge"
						>
							{{ tag }}
							<button
								type="button"
								class="tag-remove"
								@click="removeTag(index)"
							>
								×
							</button>
						</span>
						<input
							type="text"
							class="tag-input"
							v-model="tagInput"
							@keydown.enter.prevent="addTag"
							@keydown.comma.prevent="addTag"
							@input="searchTags"
							placeholder="Type and press Enter to add tags..."
						/>
					</div>
					<div
						v-if="suggestedTags.length > 0 && tagInput"
						class="tag-suggestions"
					>
						<div
							v-for="tag in suggestedTags"
							:key="tag"
							class="tag-suggestion-item"
							@click="selectSuggestedTag(tag)"
						>
							{{ tag }}
						</div>
					</div>
				</div>
				<small class="form-text text-muted">
					Press Enter or comma to add tags
				</small>
			</div>

			<div class="mb-3 d-flex align-items-center justify-content-between">
				<label class="form-label mb-0">Reserved Rules</label>
				<label class="switch">
					<input type="checkbox" v-model="form.reserved_rules" />
					<span class="slider"></span>
				</label>
			</div>

			<div class="d-flex gap-2">
				<button
					type="submit"
					class="btn btn-primary"
					:disabled="submitting"
				>
					<span
						v-if="submitting"
						class="spinner-border spinner-border-sm me-2"
					></span>
					Create Business Rule
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
import SearchableDropdown from "../Layout/searchableDropdown.vue";
import { mapActions, mapGetters } from "vuex";
export default {
	components: {
		SearchableDropdown,
	},
	data() {
		return {
			form: {
				name: "",
				description: "",
				reserved_rules: false,
				data_model_id: null,
				app_package: "",
				workflow: "",
				user_specific_field_id: "",
				multiple_user_specific_field_id: "",
				link_to: null,
				destination_id: null,
			},
			selectedTags: [],
			tagInput: "",
			suggestedTags: [],
			errors: {},
			formError: "",
			submitting: false,
			searchTimeout: null,
		};
	},

	async mounted() {
		await this.fetchRules();
		await this.fetchModels();
		await this.fetchDashboards();
	},
	computed: {
		...mapGetters("BusinessRule", ["filteredRules"]),
		...mapGetters("DataModel", ["filteredModel"]),
		...mapGetters("Dashboard", ["filteredDashboards"]),

		businessRuleNameSet() {
			const list = Array.isArray(this.filteredRules)
				? this.filteredRules
				: [];
			return list.map((rule) => (rule.name || "").trim().toLowerCase());
		},

		dataModelOptions() {
			console.log("Filter", this.filteredModel);
			return (this.filteredModel || []).map((model) => ({
				value: model.id,
				label: model.name,
			}));
		},

		destinationOptions() {
			if (this.form.link_to === "dashboard") {
				return (this.filteredDashboards || []).map((dashboard) => ({
					value: dashboard.id,
					label: dashboard.name,
				}));
			}

			return [];
		},
	},
	methods: {
		...mapActions("BusinessRule", ["fetchRules", "createBusinessRule"]),
		...mapActions("DataModel", ["fetchModels"]),
		...mapActions("Dashboard", ["fetchDashboards"]),
		...mapActions("Tags", ["searchTagsByInput", "addTagsToRule"]),

		validate() {
			this.errors = {};

			if (!this.form.name) {
				this.errors.name = "Rule name is required";
			}
			console.log("DM", this.form.data_model_id);
			if (!this.form.data_model_id) {
				this.errors.data_model_id = "Data model is required";
			}

			console.log("D_id", this.form.destination_id);
			if (this.form.link_to && !this.form.destination_id) {
				this.errors.destination_id =
					"Destination is required when link to is set";
			}

			return Object.keys(this.errors).length === 0;
		},

		async checkUniqueName() {
			const name = (this.form.name || "").trim().toLowerCase();
			if (!name) return;
			console.log("Business", this.businessRuleNameSet);
			if (this.businessRuleNameSet.includes(name)) {
				this.errors.name = "Name Already Present";
			} else if (this.errors.name === "Name Already Present") {
				this.errors.name = "";
			}
		},

		handleLinkToChange() {
			this.form.destination_id = null;
			this.errors.destination_id = "";
		},

		addTag() {
			const tag = this.tagInput.trim().toLowerCase();
			if (tag && !this.selectedTags.includes(tag)) {
				this.selectedTags.push(tag);
				this.tagInput = "";
				this.suggestedTags = [];
			}
		},

		removeTag(index) {
			this.selectedTags.splice(index, 1);
		},

		selectSuggestedTag(tag) {
			if (!this.selectedTags.includes(tag)) {
				this.selectedTags.push(tag);
			}
			this.tagInput = "";
			this.suggestedTags = [];
		},

		async searchTags() {
			if (this.searchTimeout) {
				clearTimeout(this.searchTimeout);
			}

			if (!this.tagInput.trim()) {
				this.suggestedTags = [];
				return;
			}

			this.searchTimeout = setTimeout(async () => {
				try {
					const tags = await this.searchTagsByInput(this.tagInput);
					this.suggestedTags = tags.filter(
						(tag) => !this.selectedTags.includes(tag)
					);
				} catch (error) {
					console.error("Error searching tags:", error);
					this.suggestedTags = [];
				}
			}, 300);
		},

		async onSubmit() {
			console.log("Hey");
			try {
				this.formError = "";

				if (!this.validate()) return;
				await this.checkUniqueName();
				if (this.errors.name) return;

				this.submitting = true;

				const payload = {
					name: this.form.name,
					description: this.form.description || null,
					reserved_rules: this.form.reserved_rules,
					data_model_id: this.form.data_model_id,
					app_package: this.form.app_package || null,
					workflow: this.form.workflow || null,
					user_specific_field_id:
						this.form.user_specific_field_id || null,
					multiple_user_specific_field_id:
						this.form.multiple_user_specific_field_id || null,
					link_to: this.form.link_to || null,
					destination_id: this.form.destination_id || null,
				};
				console.log("HEYYYYYYYYYy");
				const result = await this.createBusinessRule(payload);
				console.log("Result ", result);

				if (this.selectedTags.length > 0 && result.id) {
					await this.addTagsToRule({
						business_rule_id: result.id,
						tags: this.selectedTags,
					});
				}

				this.form = {
					name: "",
					description: "",
					reserved_rules: false,
					data_model_id: null,
					app_package: "",
					workflow: "",
					user_specific_field_id: "",
					multiple_user_specific_field_id: "",
					link_to: null,
					destination_id: null,
				};
				this.selectedTags = [];

				this.$router.replace("/admin/business-rules");
			} catch (error) {
				this.formError = "Something went wrong " || error.message;
			} finally {
				this.submitting = false;
			}
		},

		handleCancel() {
			this.$router.push("/admin/business-rules");
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
	max-width: 600px;
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

/* Tag Input Styles */
.tag-input-container {
	position: relative;
}

.tags-display {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem;
	border: 1px solid #ced4da;
	border-radius: 0.375rem;
	min-height: 48px;
	background-color: white;
	cursor: text;
}

.tag-badge {
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;
	padding: 0.25rem 0.5rem;
	background-color: #0d6efd;
	color: white;
	border-radius: 0.25rem;
	font-size: 0.875rem;
}

.tag-remove {
	background: none;
	border: none;
	color: white;
	font-size: 1.25rem;
	line-height: 1;
	cursor: pointer;
	padding: 0;
	margin-left: 0.25rem;
	opacity: 0.8;
}

.tag-remove:hover {
	opacity: 1;
}

.tag-input {
	flex: 1;
	border: none;
	outline: none;
	min-width: 120px;
	padding: 0.25rem;
	font-size: 1rem;
}

.tag-suggestions {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	margin-top: 0.25rem;
	background: white;
	border: 1px solid #ced4da;
	border-radius: 0.375rem;
	max-height: 200px;
	overflow-y: auto;
	z-index: 1000;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.tag-suggestion-item {
	padding: 0.5rem 1rem;
	cursor: pointer;
	transition: background-color 0.2s;
}

.tag-suggestion-item:hover {
	background-color: #f8f9fa;
}

.tag-suggestion-item:active {
	background-color: #e9ecef;
}

textarea.form-control {
	resize: vertical;
}
</style>

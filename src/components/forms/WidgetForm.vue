<template>
	<div class="main">
		<div class="header">
			<div class="back">
				<button @click="confirmReturn" class="backButton">
					<font-awesome-icon icon="fa-solid fa-arrow-left" />
					<span>Back to Dashboard</span>
				</button>
			</div>
			<div class="heading">
				<h2 class="fw-semibold">Edit Widget</h2>
			</div>
		</div>
		<form @submit.prevent="onSubmit" novalidate>
			<div class="mb-3">
				<label class="form-label"
					>Widget Name <span class="text-danger">*</span></label
				>
				<input
					type="text"
					class="form-control"
					@blur="checkLocalDuplicate"
					v-model="this.form.name"
					:class="{ 'is-invalid': errors.name }"
					placeholder="e.g. Analytics"
				/>
			</div>
			<div class="position-relative mb-3">
				<searchable-dropdown
					label='Business Rules <spanclass="text-danger">*</span>'
					placeholder="Business Rules ..."
					v-model="this.form.business_rule_id"
					:class="{ 'is-invalid': errors.business_rule_id }"
					:options="rules"
					@changeval="updateModel"
				>
				</searchable-dropdown>
				<font-awesome-icon
					@click="goToRule"
					v-if="this.form.business_rule_id"
					class="fontIcon"
					icon="fa-solid fa-arrow-up-right-from-square"
				/>
			</div>
			<div class="position-relative mb-3">
				<searchable-dropdown
					label="Data Model "
					placeholder="Data Model"
					v-model="this.form.data_model_id"
					:options="dataModels"
					:readonly="true"
				>
				</searchable-dropdown>
				<font-awesome-icon
					@click="goToModel"
					v-if="this.form.data_model_id"
					class="fontIcon"
					icon="fa-solid fa-arrow-up-right-from-square"
				/>
			</div>

			<div class="d-flex">
				<button class="btn btn-primary">Update Widget</button>
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
	components: { SearchableDropdown },
	data() {
		return {
			uuid: this.$route.params.uuid,
			loading: true,
			errors: {},
			dataModels: [],
			formError: "",
			form: {
				name: "",
				business_rule_id: null,
				data_model_id: null,
				dashboard_id: null,
			},
			model_uuid: null,
			rule_uuid: null,
		};
	},

	computed: {
		...mapGetters("BusinessRule", ["filteredRules"]),

		rules() {
			return (this.filteredRules || []).map((rule) => ({
				value: rule.id,
				label: rule.name,
			}));
		},

		selectedWidget() {
			return this.$store.getters.getSelected;
		},
	},

	methods: {
		...mapActions("BusinessRule", ["fetchRules"]),
		...mapActions("Widget", ["model", "updateWidget"]),

		async updateModel(newVal) {
			if (!newVal) {
				return;
			}
			const payload = { business_rule_id: newVal };
			const data = await this.model(payload);

			this.dataModels.push({
				label: data.data.name,
				value: data.data.data_model_id,
			});
			this.form.data_model_id = data.data.data_model_id;

			console.log("DATA", data);

			this.model_uuid = data.data.model_uuid;
			this.rule_uuid = data.data.rule_uuid;
		},

		confirmReturn() {
			if (!confirm("Are You sure you want to go back?")) return;
			this.$router.back();
		},
		goToRule() {
			const route = this.$router.resolve({
				path: `/admin/business-rules/${this.rule_uuid}/overview`,
			});
			window.open(route.href, "_blank");

			console.log("Route", route);
		},

		goToModel() {
			const route = this.$router.resolve({
				path: `/admin/data-model/${this.model_uuid}`,
			});
			window.open(route.href, "_blank");
		},

		validate() {
			if (!this.form.name) {
				this.errors.name = "Widget Name Is Required";
			}
			if (!this.form.business_rule_id) {
				this.errors.business_rule_id = "Business Rule Is Required";
			}
			if (this.form.business_rule_id && !this.form.data_model_id) {
				this.errors.data_model_id =
					"Unable to fetch data model for this rule";
				toastService.error("Unable to fetch data model for this rule");
				toastService.error("Please select a different rule");
			}
			return Object.keys(this.errors).length === 0;
		},

		async onSubmit() {
			try {
				this.formError = "";

				if (!this.validate()) {
					return;
				}

				const payload = {
					name: this.form.name,
					data_model_id: this.form.data_model_id,
					dashboard_id: this.form.dashboard_id,
					business_rule_id: this.form.business_rule_id,
				};
				const result = await this.updateWidget({
					payload: payload,
					uuid: this.$route.params.uuid2,
				});
				this.form = {
					name: "",
					data_model_id: null,
				};

				if (result.success) {
					this.successMessage = "Widget Updated successfully!";

					toastService.success(this.successMessage);

					this.$router.back();
				} else {
					this.formError = result.error || "Failed Update Widget";
					toastService.error("Failed Update Widget");
				}
			} catch (error) {
				this.formError = "Something went wrong " || error.message;
			} finally {
				this.submitting = false;
			}
		},
	},

	mounted() {
		this.fetchRules();
		this.form.name = this.selectedWidget.name;
		this.form.business_rule_id = this.selectedWidget.rule_id;

		if (this.selectedWidget.rule_id) {
			this.updateModel(this.selectedWidget.rule_id);
		}
		this.form.dashboard_id = this.selectedWidget.dash_id;
		console.log();
	},
};
</script>

<style scoped>
.fontIcon {
	position: absolute;
	right: 1rem;
	top: 2.5rem;
	cursor: pointer;
	height: 1.4rem;
	width: 2rem;
}
.backButton {
	background-color: transparent;
	border: none;
	margin: 0;
	padding: 0;
	text-align: inherit;
	font: inherit;
	border-radius: 0;
	appearance: none;
	color: rgb(65, 65, 215);
}
a {
	text-decoration: none;
}

.main {
	padding: 1rem 2rem 0 1rem;
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

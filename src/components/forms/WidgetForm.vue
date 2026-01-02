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
					label="Data Model"
					placeholder="Data Model..."
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

			<div class="d-flex gap-2">
				<button
					type="submit"
					class="btn btn-primary"
					:disabled="submitting"
				>
					Update Widget
				</button>
				<button type="button" class="btn btn-secondary" @click="cancel">
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
			widget: {},
		};
	},

	computed: {
		...mapGetters("BusinessRule", ["filteredRules"]),
		...mapGetters("DataModel", ["filteredModel"]),
		...mapGetters("Widget", ["getAllWidgets"]),

		rules() {
			return (this.filteredRules || []).map((rule) => ({
				value: rule.id,
				label: rule.name,
			}));
		},
	},

	methods: {
		...mapActions("BusinessRule", ["fetchRules"]),
		...mapActions("Widget", [
			"modelByRule",
			"updateWidget",
			"fetchWidgets",
		]),
		...mapActions("DataModel", ["fetchModels"]),

		cancel() {
			this.$router.replace(
				`/admin/dashboard/design/
				${this.$route.params.uuid}`
			);
		},
		async updateModel(newVal) {
			if (!newVal) {
				return;
			}
			const payload = { business_rule_id: newVal };
			const data = await this.modelByRule(payload);
			this.dataModels.push({
				label: data.data.name,
				value: data.data.data_model_id,
			});
			this.form.data_model_id = data.data.data_model_id;

			this.model_uuid = data.data.model_uuid;
			this.rule_uuid = data.data.rule_uuid;
		},

		confirmReturn() {
			if (!confirm("Are You sure you want to go back?")) return;
			this.$router.replace(
				`/admin/dashboard/design/
				${this.$route.params.uuid}`
			);
		},
		goToRule() {
			const route = this.$router.resolve({
				path: `/admin/business-rules/${this.rule_uuid}/overview`,
			});

			window.open(route.href, "_blank");
		},

		goToModel() {
			const route = `/admin/data-model/${this.model_uuid}`;

			window.open(route, "_blank");
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

					this.$router.replace(
						`/admin/dashboard/design/
				${this.$route.params.uuid}`
					);
				} else {
					this.formError = result.error || "Failed Update Widget";
				}
			} catch (error) {
				this.formError = "Something went wrong " || error.message;
			} finally {
				this.submitting = false;
			}
		},
	},

	async mounted() {
		await this.fetchRules();
		await this.fetchModels();

		await this.fetchWidgets({
			id: this.$route.params.uuid,
			variable: "uuid",
		});

		this.widget = this.getAllWidgets.find(
			(wid) => wid.uuid === this.$route.params.uuid2
		);
		this.form.name = this.widget.name;
		this.form.business_rule_id = this.widget.rule_id;

		if (this.widget.rule_id) {
			this.updateModel(this.widget.rule_id);
		}
		this.form.dashboard_id = this.widget.dash_id;
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
form {
	padding: 1.5rem;
	max-width: 48vw;
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

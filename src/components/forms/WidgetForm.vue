<template>
	<div class="container mt-4">
		<h2>Edit Widget</h2>

		<div v-if="loading">Loading...</div>

		<div v-else>
			<!-- Name -->
			<div class="mb-3">
				<label class="form-label">Widget Name</label>
				<input type="text" class="form-control" v-model="form.name" />
			</div>

			<!-- Business Rules -->
			<div class="mb-3">
				<label class="form-label">Business Rule</label>
				<select
					class="form-select"
					v-model="form.business_rule_id"
					@change="fetchDataModels"
				>
					<option disabled value="">Select Business Rule</option>
					<option
						v-for="rule in businessRules"
						:key="rule.id"
						:value="rule.id"
					>
						{{ rule.name }}
					</option>
				</select>
			</div>

			<!-- Data Models -->
			<div class="mb-3">
				<label class="form-label">Data Model</label>
				<select class="form-select" v-model="form.data_model_id">
					<option disabled value="">Select Data Model</option>
					<option
						v-for="model in dataModels"
						:key="model.id"
						:value="model.id"
					>
						{{ model.name }}
					</option>
				</select>
			</div>

			<button class="btn btn-primary" @click="updateWidget">
				Update Widget
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "WidgetEdit",

	data() {
		return {
			uuid: this.$route.params.uuid,
			loading: true,
			businessRules: [],
			dataModels: [],
			form: {
				name: "",
				business_rule_id: "",
				data_model_id: "",
				dashboard_id: null,
			},
		};
	},

	async created() {
		await this.fetchWidget();
		await this.fetchBusinessRules();

		if (this.form.business_rule_id) {
			await this.fetchDataModels();
		}
	},

	methods: {
		// -------------------------------------------
		// Fetch widget details
		// -------------------------------------------
		async fetchWidget() {
			try {
				const res = await fetch(`/api/widgets/${this.uuid}`);
				const data = await res.json();

				this.form.name = data.name;
				this.form.business_rule_id = data.business_rule_id;
				this.form.data_model_id = data.data_model_id;
			} catch (err) {
				console.error("Error fetching widget:", err);
			} finally {
				this.loading = false;
			}
		},

		// -------------------------------------------
		// Fetch business rules
		// -------------------------------------------
		async fetchBusinessRules() {
			try {
				const res = await fetch("/api/business-rules");
				this.businessRules = await res.json();
			} catch (err) {
				console.error("Error fetching business rules:", err);
			}
		},

		// -------------------------------------------
		// Fetch data models based on business rule
		// -------------------------------------------
		async fetchDataModels() {
			if (!this.form.business_rule_id) return;

			try {
				const res = await fetch(
					`/api/data-models?business_rule=${this.form.business_rule_id}`
				);
				this.dataModels = await res.json();
			} catch (err) {
				console.error("Error fetching data models:", err);
			}
		},

		// -------------------------------------------
		// Update widget
		// -------------------------------------------
		async updateWidget() {
			try {
				await fetch(`/api/widgets/${this.uuid}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(this.form),
				});

				alert("Widget updated successfully!");
				this.$router.push("/admin/dashboard");
			} catch (err) {
				console.error("Update failed:", err);
				alert("Error updating widget");
			}
		},
	},
};
</script>

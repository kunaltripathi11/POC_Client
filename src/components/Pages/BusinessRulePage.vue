<template>
	<div class="page">
		<div class="header">
			<div class="header-top">
				<div class="back">
					<router-link
						to="/admin/business-rules"
						class="text-decoration-none fw-bold p-4"
					>
						<font-awesome-icon icon="fa-solid fa-arrow-left" />
						<span>Back to Business Rules</span>
					</router-link>
				</div>
			</div>

			<div class="header-bottom">
				<div class="bottom-headings">
					<ul class="list-unstyled d-flex flex-direction-row">
						<router-link
							:to="`/admin/business-rules/${this.$route.params.uuid}/overview`"
							class="text-decoration-none"
						>
							<li :class="{ active: isSelected === 'overview' }">
								OVERVIEW
							</li>
						</router-link>

						<router-link
							@click="editRule(getRuleToEdit)"
							:to="`/admin/business-rules/${this.$route.params.uuid}/edit`"
							class="text-decoration-none"
						>
							<li :class="{ active: isSelected === 'edit' }">
								EDIT
							</li>
						</router-link>
					</ul>
				</div>
				<h4>{{ ruleName }}</h4>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	data() {
		return {
			isSelected: "overview",
			route: this.$router.route,
			ruleName: "",
		};
	},

	methods: {
		...mapActions("BusinessRule", [
			"fetchRuleByID",
			"editRule",
			"fetchRules",
		]),

		changeSelected(route) {
			if (route.path.includes("overview")) this.isSelected = "overview";
			else if (route.path.includes("edit")) this.isSelected = "edit";
		},
	},
	computed: {
		...mapGetters("BusinessRule", [
			"getColumns",
			"getRuleById",
			"filteredRules",
		]),
		columns() {
			return this.getColumns;
		},

		rules() {
			return this.getRuleById;
		},

		getRuleToEdit() {
			let reqRule = {};
			for (let rule of this.filteredRules) {
				if (this.$route.params.uuid === rule.uuid) {
					reqRule = rule;
					break;
				}
			}
			return reqRule;
		},
	},

	async mounted() {
		await this.fetchRules();
		const ruleDetail = await this.fetchRuleByID(this.$route.params.uuid);
		this.changeSelected(this.$route);
		this.ruleName = ruleDetail.name;
	},

	watch: {
		$route(to) {
			this.changeSelected(to);
		},
	},
};
</script>

<style scoped>
h2 {
	padding: 13rem;
}

.main {
	width: calc(100vw-15rem);
	margin-top: 1rem;
	margin-left: 1rem;
}
.table {
	border-radius: 10px;
	overflow: hidden;
}
td,
th {
	vertical-align: middle;
}
.header {
	width: calc(100vw-15rem);
	height: 9rem;
	margin-left: 1rem;
	margin-top: 1rem;
	margin-right: 1rem;
	border: 0.7px solid rgb(154, 151, 151);
}

.header-top {
	padding: 0.4rem;
	border-bottom: 1px solid rgb(198, 190, 190);
}

.back {
	a {
		color: rgb(10, 10, 193);
	}
}

ul {
	padding-left: 0.1rem;
	padding-top: 0.7rem;
	padding-bottom: 0.7rem;
	border-bottom: 1px solid rgb(218, 209, 209);
}
li {
	width: 7rem;
	text-align: center;
	height: 2rem;
	padding-top: 0.22rem;
	cursor: pointer;
}
h4,
.bottom-headings ul {
	padding-left: 1rem;
}
.header-bottom li.active {
	color: #ffffff;
	background-color: #2563eb;
	box-shadow: 0 4px 10px rgba(76, 92, 117, 0.4);
	border-radius: 9px;
}
</style>

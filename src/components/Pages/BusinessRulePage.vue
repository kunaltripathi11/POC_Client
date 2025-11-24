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
							<li
								:class="{ active: isSelected === 'overview' }"
								@click="changeSelected('overview')"
							>
								OVERVIEW
							</li>
						</router-link>

						<router-link
							:to="`/admin/business-rules/${this.$route.params.uuid}/edit`"
							class="text-decoration-none"
						>
							<li
								:class="{ active: isSelected === 'edit' }"
								view
								@click="changeSelected('edit')"
							>
								EDIT
							</li>
						</router-link>
					</ul>
				</div>
				<h3>name</h3>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	data() {
		return { isSelected: "overview" };
	},

	methods: {
		...mapActions("BusinessRule", ["fetchRuleByID"]),
		changeSelected(option) {
			this.isSelected = option;
		},
	},
	computed: {
		...mapGetters("BusinessRule", ["getColumns", "getRuleById"]),
		columns() {
			return this.getColumns;
		},

		rules() {
			return this.getRuleById;
		},
	},

	mounted() {
		console.log("UUID");
		this.fetchRuleByID(this.$route.params.uuid);

		console.log("columns", this.rules);
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
	margin-left: 14rem;
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
	margin-left: 14rem;
	margin-top: 6rem;
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
.header-bottom li.active {
	color: #ffffff;
	background-color: #2563eb;
	box-shadow: 0 4px 10px rgba(76, 92, 117, 0.4);
	border-radius: 9px;
}
</style>

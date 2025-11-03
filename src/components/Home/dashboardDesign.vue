<template>
	<div class="container mt-4">
		<AddWigdetDrawer :show="drawerVisible"></AddWigdetDrawer>
		<div class="widget">
			<div class="back">
				<div class="backToDashboard">
					<router-link
						to="/admin/dashboard"
						class="text-decoration-none fw-semibold text-primary"
					>
						<font-awesome-icon icon="fa-solid fa-arrow-left" />
						Back To Dashboard
					</router-link>
				</div>

				<div class="add-widget" v-if="dashboard && dashboard.length">
					<h4>
						{{ dashboard[0].title }}
					</h4>

					<ul class="list-unstyled d-flex justify-content-between">
						<div class="d-flex">
							<li>Build</li>
							<li>Filter</li>
							<li>Logs</li>
						</div>
						<div class="buttons">
							<button class="btn btn-primary" @click="openDrawer">
								+ Add Widget
							</button>
							<button>Save</button>
						</div>
					</ul>
					<div class="toggle-icon" @click="toggleDrawer">
						<font-awesome-icon
							icon="fa-solid fa-chevron-right"
							class="text-primary"
							:class="{ 'rotate-icon': drawerVisible }"
						/>
					</div>
				</div>
			</div>
			<div class="main-content">Main</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddWigdetDrawer from "../Layout/addWigdetDrawer.vue";

export default {
	components: { AddWigdetDrawer },
	props: ["uuid"],
	data() {
		return {
			drawerVisible: false,
		};
	},
	computed: {
		...mapGetters("Dashboard", ["getDashboardById"]),
		dashboard() {
			return this.getDashboardById;
		},
	},
	methods: {
		...mapActions("Dashboard", ["fetchDashboardById"]),

		openDrawer() {
			this.drawerVisible = true;
		},
		toggleDrawer() {
			this.drawerVisible = !this.drawerVisible;
		},
	},
	async mounted() {
		await this.fetchDashboardById(this.uuid);
	},
};
</script>

<style scoped>
.toggle-icon {
	font-size: 1.3rem;
	cursor: pointer;
	transition: 0.3s;

	background-color: rgb(99, 105, 110);
	position: absolute;
	top: 45%;

	height: 4rem;
	width: 1.3rem;
	display: flex;
	align-items: center;
	right: 19.7vw;
	z-index: 10001;
	border-radius: 10%;
}
.close {
}
.open {
	right: 0;
}
.rotate-icon {
	transform: rotate(180deg);
	transition: transform 0.6s ease;
}
li {
	margin: 3px;
}

.back {
	border: 1px solid grey;
	margin-bottom: 1.2rem;
	/* max-height: 70vh; */
}
.backToDashboard {
	border-bottom: 1px solid black;
	padding: 1rem 0 0 1rem;
}
.add-widget {
	padding: 0.7rem 1rem 0 1.2rem;
}
.main-content {
	border: 1px solid grey;
	padding: 1rem 0 0 1rem;
}
.container {
	max-width: 95%;
	padding-top: 5rem;
	padding-left: 12rem;
}
</style>

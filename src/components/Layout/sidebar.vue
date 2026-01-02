<template>
	<div
		class="d-flex flex-column flex-shrink-0 pt-3 sidebar"
		:class="{ collapsed: isCollapse }"
	>
		<ul class="nav flex-column mb-auto">
			<router-link to="/launchpad">
				<div
					class="sidebar-items"
					v-tooltip="isCollapse ? 'Home – All Apps' : ''"
				>
					<li>
						<font-awesome-icon icon="fa-solid fa-house" size="lg" />
						<span class="nav-text">&nbsp; Home - All Apps</span>
					</li>
				</div>
			</router-link>

			<div class="sidebar-items" v-if="this.$route.params.url">
				<li>
					<span class="nav-text">&nbsp; {{ dashname }}</span>
				</li>
			</div>

			<router-link to="/admin/dashboard" v-if="!this.$route.params.url">
				<div
					class="sidebar-items"
					:class="{
						active: activeItem === 'dashboard',
					}"
					v-tooltip="isCollapse ? 'Dashboard' : ''"
				>
					<li class="nav-item">
						<font-awesome-icon
							class="icon-active"
							icon="fa-solid fa-calendar-days"
							size="lg"
						/>
						<span class="nav-text">&nbsp; Dashboard</span>
					</li>
				</div>
			</router-link>
			<router-link to="/admin/application" v-if="!this.$route.params.url">
				<div
					class="sidebar-items dash"
					:class="{
						active: activeItem === 'app',
					}"
					v-tooltip="isCollapse ? 'Application' : ''"
				>
					<li>
						<font-awesome-icon
							class="icon-active"
							icon="fa-solid fa-clone"
							size="lg"
						/>
						<span class="nav-text">&nbsp; Application</span>
					</li>
				</div>
			</router-link>
			<div
				class="analytics"
				@click="toggleAnalytics"
				v-if="!this.$route.params.url"
			>
				<div
					class="sidebar-items"
					:class="{
						active: activeItem === 'analytics',
					}"
					v-tooltip="isCollapse ? 'Analytics' : ''"
				>
					<li>
						<font-awesome-icon
							class="icon-active"
							icon="fa-solid fa-chart-line"
							size="lg"
						/><span class="nav-text">&nbsp; Analytics</span>
					</li>
				</div>
			</div>
			<transition name="fade">
				<ul v-if="isAnalytics">
					<router-link to="/admin/business-rules" v-if="!isCollapse">
						<div
							class="submenu"
							:class="{
								active: activeChild === 'business_rules',
							}"
						>
							<li>
								<font-awesome-icon
									class="icon-active"
									icon="fa-regular fa-envelope"
									size="lg"
								/>
								<span class="nav-text"
									>&nbsp; Business Rules</span
								>
							</li>
						</div>
					</router-link>
					<router-link to="/admin/data-model" v-if="!isCollapse">
						<div
							class="submenu"
							:class="{ active: activeChild === 'data_models' }"
						>
							<li>
								<font-awesome-icon
									class="icon-active"
									icon="fa-regular fa-file"
									size="lg"
								/>
								<span class="nav-text">&nbsp; Data Models</span>
							</li>
						</div>
					</router-link>
				</ul>
			</transition>
		</ul>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	data() {
		return {
			activeItem: "app",
			isAnalytics: false,
			activeChild: null,
		};
	},
	async mounted() {
		this.checkActive(this.$route);
		this.handleResize();
		window.addEventListener("resize", this.handleResize);

		if (this.$route.params.url) {
			await this.fetchDashboards();
		}
	},
	beforeUnmount() {
		window.removeEventListener("resize", this.handleResize);
	},

	methods: {
		...mapActions("Dashboard", ["fetchDashboards"]),
		handleResize() {
			const shouldCollapse = window.innerWidth < 1000;
			if (this.isCollapse !== shouldCollapse) {
				this.$store.dispatch("Sidebar/setCollapsed", shouldCollapse);
			}
		},
		setActiveItem(val) {
			this.activeItem = val;
		},
		setActiveChild(val) {
			this.activeChild = val;
		},
		toggleAnalytics() {
			this.isAnalytics = !this.isAnalytics;
			this.activeItem = this.isAnalytics ? "analytics" : "";
			if (this.isAnalytics && this.isCollapse) {
				this.$store.dispatch("Sidebar/setCollapsed", false);
				this.setActiveChild("");
			}
		},
		checkActive(route) {
			if (route.path.includes("/application")) {
				this.setActiveItem("app");
				this.setActiveChild("");
			} else if (route.path.includes("/dashboard")) {
				this.setActiveItem("dashboard");
				this.setActiveChild("");
				this.isAnalytics = false;
			} else if (route.path.includes("/data-model")) {
				this.isAnalytics = true;
				this.setActiveItem("analytics");
				this.setActiveChild("data_models");
			} else if (route.path.includes("/business-rules")) {
				this.isAnalytics = true;
				this.setActiveItem("analytics");
				this.setActiveChild("business_rules");
			}
		},
	},
	computed: {
		...mapGetters("Dashboard", ["filteredDashboards"]),
		isCollapse() {
			return this.$store.getters["Sidebar/isCollapsed"];
		},
		dashname() {
			if (!this.$route.params.url) return null;

			const dashboard = this.filteredDashboards?.find(
				(dash) => dash.url === "/" + this.$route.params.url
			);
			return dashboard?.name;
		},
	},
	watch: {
		$route(to) {
			this.checkActive(to);
		},
	},
};
</script>

<style scoped>
.analytics {
	cursor: pointer;
}
.sidebar {
	position: fixed;
	top: 3rem;
	left: 0;
	height: calc(100vh - 3rem);
	width: 13rem;
	background: #f5f8f8;
	overflow-y: auto;
	z-index: 999;
	box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
	transition: width 0.3s ease;
	white-space: nowrap;
}
.sidebar-items {
	padding: 1rem;
	margin: 0;
}
.sidebar-items:hover {
	background: rgba(0, 0, 0, 0.1);
}
a,
a:hover {
	text-decoration: none;
	color: rgb(15, 15, 15);
}
.active {
	background: rgb(0, 51, 141) !important;
	color: white !important;
	.nav-text,
	.icon-active {
		color: white;
	}
}
.submenu {
	padding: 0;
}
.submenu li {
	list-style: none;
	padding: 0.6rem 0.4rem;
}

.fade-enter-active .fade-leave-active {
	opacity: 1;
	transition: opacity 0.25s;
}
.fade-enter-from .fade-leave-to {
	opacity: 0;
}
.collapsed {
	width: 4rem;
}

.collapsed .nav-text {
	display: none;
}

.collapsed li {
	justify-content: center;
}

.sidebar {
	overflow-x: hidden;
}
</style>

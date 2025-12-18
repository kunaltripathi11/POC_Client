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
			<router-link to="/admin/dashboard">
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
			<router-link to="/admin/application">
				<div
					class="sidebar-items"
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
			<div class="analytics" @click="toggleAnalytics">
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
					<router-link to="/admin/business-rules">
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
					<router-link to="/admin/data-model">
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
export default {
	data() {
		return {
			activeItem: "app",
			isAnalytics: false,
			activeChild: null,
		};
	},
	mounted() {
		this.checkActive(this.$route);

		this.handleResize();
		window.addEventListener("resize", this.handleResize);
	},
	beforeUnmount() {
		window.removeEventListener("resize", this.handleResize);
	},

	methods: {
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
			this.$router.replace("/admin/business-rules");
			this.activeItem = "analytics";
			this.isAnalytics = true;
		},
		checkActive(route) {
			if (route.path.includes("/application")) {
				this.setActiveItem("app");
				this.setActiveChild("");
				this.isAnalytics = false;
			} else if (route.path.includes("/dashboard")) {
				this.setActiveItem("dashboard");
				this.setActiveChild("");
				this.isAnalytics = false;
			} else if (route.path.includes("/data-model")) {
				this.setActiveItem("analytics");
				this.setActiveChild("data_models");
			} else if (route.path.includes("/business-rules")) {
				this.setActiveItem("analytics");
				this.setActiveChild("business_rules");
			}
		},
	},
	computed: {
		isCollapse() {
			return this.$store.getters["Sidebar/isCollapsed"];
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
	/* padding: 1.5rem 0.5rem; */
	overflow-y: auto;
	z-index: 999;
	box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
	transition: width 0.3s ease;
}
.sidebar-items {
	padding: 1rem;
	margin: 0;

	/* border-radius: 0.5rem; */
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

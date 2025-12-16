<template>
	<nav class="navbar navbar-expand-lg shadow-lg fixed-top">
		<font-awesome-icon
			v-if="this.$route.path.includes('admin') && isDesktop"
			icon="fa-solid fa-bars"
			size="xl"
			style="color: #ffffff"
			class="sidebar-toggle"
			@click="toggledSidebar"
		/>

		<div
			class="container-fluid text-white"
			:class="{ collapsed: isHeaderCollapsed }"
		>
			<router-link to="/launchpad">
				<span class="brand-name px-2"
					><img
						src="/kpmg.svg"
						alt="Kpmg Icon"
						width="100rem"
						height="50rem"
				/></span>
			</router-link>
			<div>
				<div
					class="nav-items"
					v-tooltip="isHeaderCollapsed ? 'Sofy Docs' : ''"
				>
					<span
						><font-awesome-icon
							icon="fa-solid fa-book"
							size="lg"
							style="color: white" /></span
					><span class="nav-text">&nbsp;Sofy Docs</span>
				</div>
				<div
					class="nav-items"
					v-tooltip="isHeaderCollapsed ? 'Administration' : ''"
					v-if="route === '/launchpad' || route === '/'"
				>
					<router-link to="/admin">
						<span>
							<font-awesome-icon
								icon="fa-solid fa-gears"
								size="lg"
								style="color: white"
						/></span>
						<span class="nav-text"> &nbsp;Administration</span>
					</router-link>
				</div>
				<div
					class="nav-items"
					v-tooltip="isHeaderCollapsed ? 'Home' : ''"
					v-else
				>
					<router-link to="/">
						<span
							><font-awesome-icon
								icon="fa-solid fa-house"
								size="lg" /></span
						><span class="nav-text">&nbsp;Home</span>
					</router-link>
				</div>
				<div
					class="nav-items"
					v-tooltip="isHeaderCollapsed ? 'Quick Links' : ''"
				>
					<span
						><font-awesome-icon
							icon="fa-regular fa-star"
							size="lg"
							style="color: #ffffff" /></span
					><span class="nav-text">&nbsp;Quick Links</span>
				</div>

				<div
					class="dropdown"
					style="display: inline"
					v-tooltip="'Profile'"
				>
					<button data-bs-toggle="dropdown">
						<div class="nav-items">
							<span>
								<font-awesome-icon
									icon="fa-solid fa-user"
									size="lg"
									style="color: white"
								/>
							</span>
						</div>
					</button>
					<ul class="dropdown-menu">
						<li class="dropdown-item">Name</li>
						<li class="dropdown-item">Role</li>
						<li>
							<router-link
								to="/change_password"
								class="dropdown-item"
							>
								Change Password
							</router-link>
						</li>
						<li>
							<router-link to="/account" class="dropdown-item">
								Account Details
							</router-link>
						</li>
						<li>
							<router-link to="/login" class="dropdown-item">
								Logout
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			route: this.$route.path,
			isDesktop: window.innerWidth > 1000,
		};
	},
	methods: {
		handleResize() {
			this.isDesktop = window.innerWidth > 1000;
			const shouldCollapse = window.innerWidth < 1000;
			if (this.isHeaderCollapsed !== shouldCollapse) {
				this.$store.dispatch(
					"Sidebar/setHeaderCollapsed",
					shouldCollapse
				);
			}
		},

		toggledSidebar() {
			this.$store.dispatch("Sidebar/toggleSidebar");
		},
	},
	mounted() {
		window.addEventListener("resize", this.handleResize);
		this.handleResize();
	},
	beforeUnmount() {
		window.removeEventListener("resize", this.handleResize);
	},

	computed: {
		isCollapse() {
			return this.$store.getters["Sidebar/isCollapsed"];
		},
		isHeaderCollapsed() {
			return this.$store.getters["Sidebar/isHeaderCollapse"];
		},
	},
	watch: {
		$route(to) {
			this.route = to.path;
		},
	},
};
</script>

<style scoped>
.navbar {
	background: rgb(0, 51, 141);
	max-height: 4rem;
	height: 4rem;
	padding: 0;
	padding-left: 0.7rem;
}

.nav-items {
	cursor: pointer;
	display: inline;
	padding: 0 0.5rem;
}

.sidebar-toggle,
.brand-name {
	cursor: pointer;
}

button {
	background: none;
	border: none;
}

a,
a:hover {
	text-decoration: none !important;
	color: white !important;
}

.dropdown-menu {
	left: -7.5rem !important;
	top: 2.4rem;

	.dropdown-item {
		color: black !important;
	}
}

.collapsed .nav-text {
	display: none;
}

.collapsed .nav-items {
	padding: 0 0.8rem;
}

.nav-items {
	display: inline-flex;
	align-items: center;
	justify-content: center;
}
</style>

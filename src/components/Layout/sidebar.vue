<template>
	<div class="d-flex flex-column flex-shrink-0 pt-3 sidebar">
		<ul class="nav flex-column mb-auto">
			<div
				class="sidebar-items"
				:class="{ active: activeItem === 'home' }"
				@click="setActiveItem('home')"
			>
				<li>
					<router-link to="/launchpad">
						<font-awesome-icon icon="fa-solid fa-house" size="lg" />
						<span class="nav-text">&nbsp; Home - All Apps</span>
					</router-link>
				</li>
			</div>
			<div
				class="sidebar-items"
				:class="{ active: activeItem === 'dashboard' }"
				@click="setActiveItem('dashboard')"
			>
				<li class="nav-item">
					<router-link to="/home">
						<font-awesome-icon
							icon="fa-solid fa-calendar-days"
							size="lg"
						/>
						<span class="nav-text">&nbsp; Dashboard</span>
					</router-link>
				</li>
			</div>
			<div
				class="sidebar-items"
				:class="{ active: activeItem === 'app' }"
				@click="setActiveItem('app')"
			>
				<li>
					<router-link to="/groups">
						<font-awesome-icon icon="fa-solid fa-clone" size="lg" />
						<span class="nav-text">&nbsp; Application</span>
					</router-link>
				</li>
			</div>
			<div
				class="sidebar-items"
				:class="{ active: activeItem === 'analytics' }"
				@click="setActiveItem('analytics')"
			>
				<li>
					<router-link to="/groups">
						<font-awesome-icon
							icon="fa-solid fa-chart-line"
							size="lg"
						/><span class="nav-text">&nbsp; Analytics</span>
					</router-link>
				</li>
			</div>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeItem: null,
		};
	},
	methods: {
		setActiveItem(val) {
			this.activeItem = val;
		},
	},
};
</script>

<style>
.sidebar {
	position: fixed;
	top: 4rem;
	left: 0;
	height: calc(100vh - 4rem);
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

.active,
.active:hover {
	background: rgb(0, 51, 141);
	color: white;
}

/* Sidebar Toggle Button */
.sidebar-icon {
	display: flex;
	align-self: center;
	padding: 0.5rem 0.75rem;
	color: #b0e7e0;
	text-decoration: none;
	border-radius: 0.5rem;
	transition: all 0.3s ease;
	font-weight: 500;
	cursor: pointer;
	margin-bottom: 1rem;
	background: rgba(176, 231, 224, 0.1);
	border: 1px solid rgba(176, 231, 224, 0.3);
}
</style>

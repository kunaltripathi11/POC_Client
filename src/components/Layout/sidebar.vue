<template>
	<div class="d-flex flex-column flex-shrink-0 pt-3 sidebar">
		<ul class="nav flex-column mb-auto">
			<router-link to="/launchpad">
				<div class="sidebar-items">
					<li>
						<font-awesome-icon icon="fa-solid fa-house" size="lg" />
						<span class="nav-text">&nbsp; Home - All Apps</span>
					</li>
				</div>
			</router-link>
			<router-link to="/home">
				<div
					class="sidebar-items"
					:class="{ active: activeItem === 'dashboard' }"
					@click="setActiveItem('dashboard')"
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
			<router-link to="/groups">
				<div
					class="sidebar-items"
					:class="{ active: activeItem === 'app' }"
					@click="setActiveItem('app')"
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
			<router-link>
				<div
					class="sidebar-items"
					:class="{ active: activeItem === 'analytics' }"
					@click="setActiveItem('analytics')"
				>
					<li>
						<font-awesome-icon
							class="icon-active"
							icon="fa-solid fa-chart-line"
							size="lg"
						/><span class="nav-text">&nbsp; Analytics</span>
					</li>
				</div>
			</router-link>
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
	top: 3rem;
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

/* .router-link-active {
	color: white !important;
} */
</style>

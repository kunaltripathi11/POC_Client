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
			<router-link to="/admin/dashboard">
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
			<router-link to="/admin/application">
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
			<div class="analytics" @click="toggleAnalatics">
				<div
					class="sidebar-items"
					:class="{ active: activeItem === 'analytics' }"
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
				<ul v-if="isAnalatics">
					<router-link to="/admin/business-rules">
						<div
							class="submenu"
							:class="{ active: activeItem === 'business_rules' }"
							@click="setActiveItem('business_rules')"
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
							:class="{ active: activeItem === 'data_models' }"
							@click="setActiveItem('data_models')"
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
			activeItem: null,
			isAnalatics: false,
		};
	},
	methods: {
		setActiveItem(val) {
			this.activeItem = val;
		},
		toggleAnalatics() {
			this.activeItem = "analytics";
			this.isAnalatics = !this.isAnalatics;
		},
	},
};
</script>

<style>
.analytics {
	cursor: pointer;
}
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
.submenu {
	padding: 0;
	/* margin-left: 0.4rem; */
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
/* .router-link-active {
	color: white !important;
} */
</style>

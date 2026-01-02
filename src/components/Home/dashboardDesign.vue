<template>
	<div class="dashboard-container">
		<AddWidgetDrawer
			:show="drawerVisible"
			@close="closeDrawer"
			@widget-drag-start="handleWidgetDragStart"
		/>
		<div
			class="drawer-toggle"
			:class="{ 'drawer-open': drawerVisible }"
			@click="toggleDrawer"
		>
			<font-awesome-icon
				icon="fa-solid fa-chevron-left"
				class="toggle-icon"
			/>
		</div>

		<div class="header-section">
			<div class="header-top">
				<router-link to="/admin/dashboard" class="back-link">
					<font-awesome-icon icon="fa-solid fa-arrow-left" />
					<span>Back to Dashboard</span>
				</router-link>
			</div>
			<div class="header-title">{{ dashboardName }}</div>
			<div class="header-bottom">
				<ul class="list-unstyled">
					<li
						:class="{ active: isSelected === 'build' }"
						@click="changeSelected('build')"
					>
						Build
					</li>
					<li
						:class="{ active: isSelected === 'filter' }"
						@click="changeSelected('filter')"
					>
						Filter
					</li>
					<li
						:class="{ active: isSelected === 'logs' }"
						@click="changeSelected('logs')"
					>
						Logs
					</li>
				</ul>
				<button class="btn btn-primary" @click="openDrawer">
					<font-awesome-icon icon="fa-solid fa-plus" />
					Add Widget
				</button>
			</div>
		</div>
		<DashboardMain
			v-if="isSelected === 'build'"
			:draggedWidget="draggedWidgetType"
			@widget-drop="handleWidgetDrop"
		/>
		<h1 v-else-if="isSelected === 'filter'" style="margin-top: 21vh">
			filter
		</h1>
		<h1 v-else-if="isSelected === 'logs'" style="margin-top: 21vh">Logs</h1>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import DashboardMain from "../Dashboard/dashboardMain.vue";
import AddWidgetDrawer from "../Layout/addWigdetDrawer.vue";

export default {
	components: { AddWidgetDrawer, DashboardMain },
	data() {
		return {
			drawerVisible: false,

			draggedWidgetType: null,
			isSelected: "build",
			widget_type: null,
		};
	},
	computed: {
		dashboardId() {
			return this.$store.getters["Widget/getDashboardId"];
		},
		dashboardDetails() {
			return this.$store.getters["Dashboard/getDashboardById"];
		},

		dashboardName() {
			return this.dashboardDetails?.[0]?.name;
		},
	},
	methods: {
		...mapActions("Dashboard", ["fetchDashboardById"]),
		changeSelected(option) {
			this.isSelected = option;
		},
		openDrawer() {
			this.drawerVisible = true;
		},
		closeDrawer() {
			this.drawerVisible = false;
		},
		toggleDrawer() {
			this.drawerVisible = !this.drawerVisible;
		},
		handleWidgetDragStart(widget) {
			this.draggedWidgetType = widget;
		},

		handleWidgetDrop(widget) {
			this.widget_type = widget.name;
			console.log("Route");
			this.$store.dispatch("Widget/addWidgetAction", {
				dashboard_id: this.dashboardId,
				widget_type: this.widget_type,
				id: this.$route.params.uuid,
			});
		},
	},
	async mounted() {
		await this.fetchDashboardById(this.$route.params.uuid);
	},
};
</script>

<style scoped>
.active {
	color: red;
}
.dashboard-container {
	transition: padding-left 0.3s ease;
}
.dashboard-container {
	--drawer-width: clamp(260px, 20vw, 380px);
}

.header-section {
	position: fixed;
	top: var(--header-height);
	left: calc(var(--sidebar-width) + 1rem);
	right: 1rem;
	background: #ffffff;
	padding: 1rem 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	border-bottom: 1px solid black;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	transition: left 0.3s ease;
	z-index: 998;
}

.header-top {
	padding-bottom: 0.5rem;
	border-bottom: 1px solid black;
}

.header-title {
	font-size: 1.25rem;
	font-weight: 700;
	color: #111827;
}

.header-bottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.header-bottom ul {
	display: flex;
	gap: 0.75rem;
	margin: 0;
	padding: 0;
}

.header-bottom li {
	padding: 0.4rem 0.75rem;
	cursor: pointer;
	border-radius: 6px;
	font-weight: 600;
	color: #374151;
	transition: all 0.2s ease;
}

.header-bottom li:hover {
	background: #f3f4f6;
}

.header-bottom li.active {
	background: #2563eb;
	color: #ffffff;
	box-shadow: 0 3px 8px rgba(37, 99, 235, 0.35);
}

.back-link {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: #2563eb;
	font-weight: 600;
	text-decoration: none;
}

.back-link:hover {
	color: #1e40af;
}

.btn {
	height: 2.3rem;
	padding: 0 1rem;
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	border-radius: 6px;
	font-weight: 500;
	transition: all 0.2s ease;
}

.btn-primary {
	background-color: #2563eb;
	color: #ffffff;
}

.btn-primary:hover {
	background-color: #1e40af;
	transform: translateY(-1px);
}

.dashboard-container {
	--drawer-width: clamp(260px, 20vw, 380px);
}

.drawer-toggle {
	position: fixed;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	background: linear-gradient(135deg, #4f46e5, #3b82f6);
	color: white;
	width: 2rem;
	height: 4rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8px 0 0 8px;
	cursor: pointer;
	box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
	transition: all 0.3s ease;
	z-index: 1100;
}

.drawer-toggle.drawer-open {
	right: var(--drawer-width);
}

.drawer-toggle:hover {
	width: 2.5rem;
}

.toggle-icon {
	font-size: 1.1rem;
	transition: transform 0.3s ease;
}

.drawer-toggle.drawer-open .toggle-icon {
	transform: rotate(180deg);
}
</style>

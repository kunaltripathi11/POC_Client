<template>
	<div class="dashboard-container">
		<AddWidgetDrawer
			:show="drawerVisible"
			@close="closeDrawer"
			@widget-drag-start="handleWidgetDragStart"
			@widget-drag-end="handleDragEnd"
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
		<h1 v-else-if="isSelected === 'filter'">filter</h1>
		<h1 v-else-if="isSelected === 'logs'">Logs</h1>
	</div>
</template>

<script>
import DashboardMain from "../Dashboard/dashboardMain.vue";
import AddWidgetDrawer from "../Layout/addWigdetDrawer.vue";

export default {
	components: { AddWidgetDrawer, DashboardMain },
	data() {
		return {
			drawerVisible: false,

			draggedWidgetType: null,
			isSelected: "build",
		};
	},
	computed: {
		dashboardId() {
			console.log(
				"dashboard Id",
				this.$store.getters["Widget/getDashboardId"]
			);
			return this.$store.getters["Widget/getDashboardId"];
		},
	},
	methods: {
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

			this.$store.dispatch("Widget/addWidgetAction", {
				dashboard_id: this.dashboardId,
				id: this.$route.params.uuid,
			});
		},
	},
};
</script>

<style scoped>
.active {
	color: red;
}
.dashboard-container {
	background-color: #f5f7fa;
	min-height: 100vh;
	max-width: 100vw;
	padding-top: 4rem;
	padding-left: 13rem;
	/* position: relative; */
	transition: all 0.3s ease;
}

.header-section {
	/* display: flex; */
	justify-content: space-between;
	height: 15vh;
	align-items: center;
	background: white;
	padding: 1rem 1.5rem;
	border-radius: 8px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
	margin-bottom: 1.5rem;
	border-bottom: 1px solid black;
}
.header-top {
	border-bottom: 1px solid black;
	width: 100%;
	/* padding: 0; */
}
.header-bottom ul {
	display: flex;
	gap: 1rem;
}

.header-bottom li {
	width: 4rem;
	text-align: center;
	margin: 1rem;
	cursor: pointer;
	border-radius: 7px;
	font-weight: 700;
	background-color: transparent;
	position: relative;
}

.header-bottom li:hover {
	background-color: #eeeeee;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
.header-bottom li.active {
	color: #ffffff;
	background-color: #2563eb;
	box-shadow: 0 4px 10px rgba(76, 92, 117, 0.4);
}

.back-link {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: #2563eb;
	font-weight: 600;
	text-decoration: none;
	transition: color 0.2s;
}

.back-link:hover {
	color: #1d4ed8;
}

.btn {
	display: flex;
	position: absolute;
	right: 3rem;
	top: 7.4rem;
	align-items: center;
	gap: 0.4rem;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	padding: 0.6rem 1.2rem;
	font-weight: 500;
	transition: all 0.2s;
}

.btn-primary {
	background-color: #2563eb;
	color: white;
}

.btn-primary:hover {
	background-color: #1e40af;
	transform: translateY(-1px);
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
	z-index: 999;
}

.drawer-toggle:hover {
	width: 2.5rem;
}

.drawer-toggle.drawer-open {
	right: 20vw;
}

.toggle-icon {
	font-size: 1.1rem;
	transition: transform 0.3s ease;
}

.drawer-toggle.drawer-open .toggle-icon {
	transform: rotate(180deg);
}
</style>

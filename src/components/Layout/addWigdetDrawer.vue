<template>
	<transition name="slide">
		<div v-if="show" class="widget-drawer">
			<div class="drawer-header">
				<h5 class="drawer-title">
					<font-awesome-icon icon="fa-solid fa-th" />
					Add Widget
				</h5>
			</div>

			<div class="drawer-body">
				<p class="drawer-description">
					Drag and drop widgets to the main content area
				</p>

				<div class="widget-list">
					<div
						v-for="widget in widgets"
						:key="widget.id"
						class="widget-item"
						draggable="true"
						@dragstart="handleDragStart(widget)"
						@dragend="handleDragEnd"
					>
						<div class="widget-icon">
							<font-awesome-icon :icon="widget.icon" />
						</div>
						<div class="widget-info">
							<h6 class="widget-name">{{ widget.name }}</h6>
							<p class="widget-desc">{{ widget.description }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			widgets: [
				{
					id: 1,
					name: "Chart",
					description: "Visualize data with charts",
					icon: "fa-solid fa-chart-line",
				},
				{
					id: 2,
					name: "Cockpit",
					description: "Dashboard control panel",
					icon: "fa-solid fa-gauge-high",
				},
				{
					id: 3,
					name: "Data Table",
					description: "Display data in tables",
					icon: "fa-solid fa-table",
				},
				{
					id: 4,
					name: "Data Set",
					description: "Manage data collections",
					icon: "fa-solid fa-database",
				},
				{
					id: 5,
					name: "Filter Bar",
					description: "Add filtering options",
					icon: "fa-solid fa-filter",
				},
			],
		};
	},
	methods: {
		handleDragStart(widget) {
			console.log("Widget Starting", widget);
			this.$emit("widget-drag-start", widget);
		},
		handleDragEnd() {
			console.log("Widget Ending");
			this.$emit("widget-drag-end");
		},
		closeDrawer() {
			this.$emit("close");
		},
	},
};
</script>

<style scoped>
.widget-drawer {
	position: fixed;
	right: 0;
	top: 4rem;
	height: calc(100vh - 4rem);
	width: 20vw;
	min-width: 320px;
	background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
	box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
	z-index: 1000;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.drawer-header {
	padding: 1.5rem;
	border-bottom: 2px solid #e5e7eb;
	background: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.drawer-title {
	margin: 0;
	font-size: 1.25rem;
	font-weight: 700;
	color: #1f2937;
	display: flex;
	align-items: center;
	gap: 0.75rem;
}

.drawer-body {
	flex: 1;
	overflow-y: auto;
	padding: 1.5rem;
}

.drawer-description {
	color: #6b7280;
	font-size: 0.875rem;
	margin-bottom: 1.5rem;
	padding: 0.75rem;
	background-color: #eff6ff;
	border-left: 3px solid #3b82f6;
	border-radius: 4px;
}

.widget-list {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.widget-item {
	background: white;
	border: 2px solid #e5e7eb;
	border-radius: 8px;
	padding: 1rem;
	cursor: grab;
	transition: all 0.2s;
	display: flex;
	align-items: center;
	gap: 1rem;
}

.widget-item:hover {
	border-color: #3b82f6;
	box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
	transform: translateX(-4px);
}

.widget-item:active {
	cursor: grabbing;
	opacity: 0.7;
}

.widget-icon {
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 8px;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.25rem;
	flex-shrink: 0;
}

.widget-info {
	flex: 1;
	min-width: 0;
}

.widget-name {
	margin: 0 0 0.25rem 0;
	font-size: 1rem;
	font-weight: 600;
	color: #1f2937;
}

.widget-desc {
	margin: 0;
	font-size: 0.75rem;
	color: #6b7280;
}

.drag-indicator {
	color: #d1d5db;
	font-size: 1rem;
	flex-shrink: 0;
}

.slide-enter-active,
.slide-leave-active {
	transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
	transform: translateX(100%);
}
</style>

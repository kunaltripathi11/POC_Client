<template>
	<div>
		<div
			class="main-content"
			@drop="handleDrop"
			@dragover.prevent="handleDragOver"
			@dragleave="handleDragLeave"
			:class="{ 'drag-over': isDragOver }"
		>
			<div v-if="widgets.length === 0" class="empty-state">
				<font-awesome-icon icon="fa-solid fa-cube" class="empty-icon" />
				<h5>No Widgets Yet</h5>
				<p>Drag and drop widgets from the panel</p>
			</div>

			<div v-else class="widgets-grid">
				<div
					v-for="widget in widgets"
					:key="widget.id"
					class="widget-box"
				>
					<widgetsDesign
						:widget="widget"
						@delete-widget="deleteWidget"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import widgetsDesign from "../Widgets/widgetsDesign.vue";

export default {
	props: ["draggedWidget"],
	components: {
		widgetsDesign,
	},
	data() {
		return {
			isDragOver: false,
			id: null,
			variable: "",
		};
	},
	async mounted() {
		let id;
		let variable;

		if (this.$route.params.uuid) {
			this.id = this.$route.params.uuid;
			this.variable = "uuid";
		} else if (this.$route.params.url) {
			this.id = "/" + this.$route.params.url;
			this.variable = "url";
		}
		id = this.id;
		variable = this.variable;

		await this.fetchWidgets({ id, variable });

		console.log("WIDGETS", this.widgets);
	},
	computed: {
		...mapGetters("Widget", ["getAllWidgets", "getDashboardId"]),
		widgets() {
			return this.getAllWidgets;
		},
		dashboardId() {
			return this.getDashboardId;
		},
	},
	methods: {
		...mapActions("Widget", ["fetchWidgets", "removeWidget"]),

		async deleteWidget(uuid) {
			const id = this.id;
			const variable = this.variable;
			await this.removeWidget({ uuid, id, variable });
		},

		handleWidgetDragStart(widget) {
			console.log("handleWidgetDragStart");
			this.draggedWidget = widget;
		},
		handleDragOver() {
			this.isDragOver = true;
		},
		handleDragLeave() {
			this.isDragOver = false;
		},
		async handleDrop(e) {
			this.isDragOver = false;

			if (!this.draggedWidget) {
				return;
			}
			this.$emit("widget-drop", this.draggedWidget);
		},
	},
};
</script>

<style scoped>
.main-content {
	background: white;
	border-radius: 10px;
	min-height: calc(100vh - 14rem);
	transition: all 0.3s ease;
	height: calc(100vh - 20vh - 4rem);
	max-height: fit-content;
	margin: 1rem;
	margin-top: calc(20vh);
	padding-top: 2.5rem;
}

.main-content.drag-over {
	border: 2px dashed #3b82f6;
	background-color: #f0f7ff;
}

.empty-state {
	text-align: center;
	color: #6b7280;
	padding: 5rem 1rem;
}

.empty-icon {
	font-size: 3rem;
	margin-bottom: 0.5rem;
	color: #9ca3af;
}

.widgets-grid {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.widget-box {
	background: #f9fafb;
	border: 1px solid #e5e7eb;
	border-radius: 8px;
	padding: 1rem;
	text-align: center;
	font-weight: 600;
	color: #374151;
	box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);

	transition: all 0.2s;
}

.widget-box:hover {
	background-color: #f3f4f6;
	transform: translateY(-2px);
}
</style>

<template>
	<div>
		<div
			class="main-content"
			@drop="handleDrop"
			@dragover="handleDragOver"
			@dragleave="handleDragLeave"
			:class="{ 'drag-over': isDragOver }"
		>
			<div v-if="widgets.length === 0" class="empty-state">
				<font-awesome-icon icon="fa-solid fa-cube" class="empty-icon" />
				<h5>No Widgets Yet</h5>
				<p>Drag and drop widgets from the panel</p>
			</div>

			<div v-else class="widgets-grid">
				<div v-for="widget in widgets" class="widget-box">
					{{ widget }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MainContent from "../Layout/MainContent.vue";

export default {
	components: {
		MainContent,
	},
	data() {
		return {
			isDragOver: false,
		};
	},
	async mounted() {
		let id;
		let variable;
		console.log(this.$route.params);
		if (this.$route.params.uuid) {
			id = this.$route.params.uuid;
			variable = "uuid";
		} else if (this.$route.params.url) {
			id = "/" + this.$route.params.url;
			variable = "url";
		}

		await this.fetchWidgets({ id, variable });
	},
	computed: {
		...mapGetters("Widget", ["getAllWidgets"]),
		widgets() {
			console.log(this.getAllWidgets);
			return this.getAllWidgets;
		},
	},
	methods: {
		handleWidgetDragStart(widgetType) {
			this.draggedWidgetType = widgetType;
		},
		handleDragOver(e) {
			e.preventDefault();
			this.isDragOver = true;
		},
		handleDragLeave() {
			this.isDragOver = false;
		},
		handleDrop(e) {
			e.preventDefault();
			this.isDragOver = false;
			if (this.draggedWidgetType) {
				this.widgets.push({
					id: Date.now(),
					type: this.draggedWidgetType,
				});
				this.draggedWidgetType = null;
			}
		},
		...mapActions("Widget", ["fetchWidgets"]),
	},
};
</script>

<style>
.main-content {
	background: white;
	border-radius: 10px;
	padding: 2rem;
	min-height: 60vh;
	border: 1px solid #e5e7eb;
	transition: all 0.3s ease;
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
	gap: 3rem;
}

.widget-box {
	background: #f9fafb;
	border: 1px solid #e5e7eb;
	border-radius: 8px;
	padding: 1.5rem;
	text-align: center;
	font-weight: 600;
	color: #374151;
	box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
	/* box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05); */

	transition: all 0.2s;
}

.widget-box:hover {
	background-color: #f3f4f6;
	transform: translateY(-2px);
}
</style>

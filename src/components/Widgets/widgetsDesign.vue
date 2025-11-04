<template>
	<div class="build-main" @drop.prevent="handleDrop" @dragover.prevent>
		<h3 class="mb-3">Build Area</h3>
		<div v-if="widgets.length === 0" class="text-muted">
			Drag and drop a widget here
		</div>
		<div class="widgets">
			<div
				v-for="widget in widgets"
				:key="widget.id"
				class="widget-card shadow-sm"
			>
				<h5>{{ widget.name }}</h5>
				<button
					class="btn btn-sm btn-outline-primary"
					@click="configure(widget)"
				>
					Configure
				</button>
			</div>
		</div>
		<!-- <ConfigureWidgetModal
			v-if="showModal"
			:widget="selectedWidget"
			@close="showModal = false"
		/> -->
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import ConfigureWidgetModal from "@/components/Widgets/ConfigureWidgetModal.vue";
export default {
	components: { ConfigureWidgetModal },
	data() {
		return {
			showModal: false,
			selectedWidget: null,
		};
	},
	computed: {
		...mapState("Widget", ["widgets"]),
	},
	methods: {
		...mapActions("Widget", ["addWidgetAction"]),
		async handleDrop() {
			const dashboardId = this.$route.params.id; // <-- get dashboard_id from route
			const widgetData = {
				dashboard_id: dashboardId,
			};
			await this.addWidget(widgetData);
		},
		// configure(widget) {
		// 	this.selectedWidget = widget;
		// 	this.showModal = true;
		// },
	},
};
</script>
<style scoped>
.build-main {
	border: 2px dashed #ccc;
	padding: 20px;
	border-radius: 10px;
	min-height: 300px;
	background-color: #fafafa;
}
.widget-card {
	background: #fff;
	padding: 15px;
	border-radius: 10px;
	margin-bottom: 10px;
	transition: 0.2s ease;
}
.widget-card:hover {
	box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}
</style>

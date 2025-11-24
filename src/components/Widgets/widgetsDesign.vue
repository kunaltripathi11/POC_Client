<!-- <template>
	<div class="build-main" @drop.prevent="handleDrop" @dragover.prevent>
		<div v-if="!widget.rule_id">
			Configue Widget
			<button
				class="btn btn-sm btn-outline-primary"
				@click="configure(widget.uuid)"
			>
				Configure
			</button>
		</div>
		<div v-else>
			<div class="main">
				<table class="table table-hover align-middle shadow-sm">
					<thead class="table-primary">
						<tr>
							<th v-for="column in columns">{{ column }}</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(widgetData, index) in widget" :key="index">
							<td
								v-for="(column, index1) in columns"
								:key="index1"
							>
								{{ widgetData[column] }}
							</td>
						</tr>

						<tr v-if="!columns || !widget">
							<td colspan="6" class="text-center text-muted py-3">
								No Data Available
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template> -->

<template>
	<div class="build-main">
		<div v-if="!widget.rule_id">
			Configure Widget
			<button
				class="btn btn-sm btn-outline-primary"
				@click="configure(widget.uuid)"
			>
				Configure
			</button>
		</div>

		<div v-else>
			<div class="main">
				<table class="table table-hover align-middle shadow-sm">
					<thead class="table-primary">
						<tr>
							<th v-for="col in widget.columns" :key="col">
								{{ col }}
							</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(row, index) in widget.query" :key="index">
							<td v-for="col in widget.columns" :key="col">
								{{ row[col] }}
							</td>
						</tr>

						<tr v-if="!widget.query || widget.query.length === 0">
							<td
								:colspan="widget.columns.length"
								class="text-center text-muted py-3"
							>
								No Data Available
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	props: ["widget"],
	data() {
		return {
			showModal: false,
			selectedWidget: null,
		};
	},
	computed: {
		...mapGetters("Widget", ["getColumns"]),

		columns() {
			return this.getColumns;
		},
	},
	methods: {
		...mapActions("Widget", ["fetchWidgets"]),
		configure(uuid) {
			this.$router.push(`${this.$route.path}/${uuid}`);
		},
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
.main {
	max-width: 1000px;
}
</style>

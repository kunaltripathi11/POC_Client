<template>
	<div class="build-main">
		<div v-if="!widget.rule_id">
			Configure Widget
			<button
				class="btn btn-sm btn-outline-primary"
				@click="configure(widget)"
			>
				Configure
			</button>
		</div>

		<div v-else>
			<div class="widget-header">
				<h5 class="widget-title">
					{{ widget.name || "New Widget" }}
				</h5>

				<div class="widget-actions">
					<button
						class="btn btn-sm btn-primary"
						@click="configure(widget)"
					>
						<font-awesome-icon icon="fa-solid fa-pen" />
					</button>

					<button
						class="btn btn-sm btn-danger"
						@click="
							$emit('delete-widget', {
								uuid: widget.uuid,
								dashUUID: this.$route.params.uuid,
							})
						"
					>
						<font-awesome-icon icon="fa-solid fa-trash" />
					</button>
				</div>
			</div>
			<div class="table-wrapper">
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
							<td class="text-center text-muted py-3">
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
		configure(widget) {
			this.$store.dispatch("SET_SELECTED", widget);
			this.$router.push(`${this.$route.path}/${widget.uuid}`);
		},
	},
};
</script>
<style scoped>
.build-main {
	border: 2px dashed #ccc;
	padding: 20px;
	border-radius: 10px;
	background-color: #fafafa;

	max-width: calc(100vw - 13rem - 2rem);
	overflow: hidden;
}

.widget-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
	padding: 0.5rem 0;
}

.widget-title {
	margin: 0;
	font-size: 1.1rem;
	font-weight: 600;
}

.widget-actions > button {
	margin-left: 0.5rem;
}

.table-wrapper {
	max-height: 60vh;
	overflow-x: auto;
	overflow-y: auto;
	background: white;
	border-radius: 8px;
}

.table-wrapper thead th {
	position: sticky;
	top: 0;
	z-index: 2;
	background: #e8f1ff;
}
td,
th {
	white-space: nowrap;
}
</style>

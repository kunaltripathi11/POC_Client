<template>
	<div class="build-main">
		<div v-if="!widget.rule_id">
			<div class="widget-actions head">
				<button
					class="btn btn-sm btn-danger"
					@click="
						$emit('delete-widget', {
							uuid: widget.uuid,
							dashUUID: this.$route.params.uuid,
						})
					"
				>
					<font-awesome-icon icon="fa-solid fa-trash" size="sm" />
				</button>
				<button
					class="btn btn-sm btn-primary"
					@click="configure(widget)"
				>
					<font-awesome-icon icon="fa-solid fa-pen " size="sm" />
				</button>
			</div>
			<div class="widget">
				Configure Widget
				<button
					class="btn btn-sm btn-outline-primary"
					@click="configure(widget)"
				>
					Configure
				</button>
			</div>
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
	padding: 0.5rem;
	border-radius: 10px;
	background-color: #fafafa;

	overflow: hidden;
}

.widget-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;
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
	max-height: calc(100vh - 22rem);
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

.head {
	display: flex;
	flex-direction: row-reverse;
}
</style>

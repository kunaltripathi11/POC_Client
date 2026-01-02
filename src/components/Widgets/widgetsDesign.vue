<template>
	<div class="build-main">
		<div v-if="!widget.rule_id">
			<div class="widget-actions head">
				<button
					class="btn btn-sm btn-danger"
					@click="$emit('delete-widget', widget.uuid)"
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

				<div class="widget-header-actions">
					<BaseSearch v-model="search" class="widget-search" />

					<div class="widget-actions" v-if="!this.$route.params.url">
						<button
							class="btn btn-sm btn-primary"
							@click="configure(widget)"
						>
							<font-awesome-icon icon="fa-solid fa-pen" />
						</button>

						<button
							class="btn btn-sm btn-danger"
							@click="$emit('delete-widget', widget.uuid)"
						>
							<font-awesome-icon icon="fa-solid fa-trash" />
						</button>
					</div>
				</div>
			</div>

			<div class="table-wrapper">
				<table class="table table-hover align-middle shadow-sm">
					<thead>
						<tr>
							<th
								v-for="col in widget.columns"
								:key="col"
								class="sortable"
								@click="sortBy(col)"
							>
								{{ col }}
								<span v-if="sortKey === col" class="sort-icon">
									<span class="material-icons">
										{{ sortOrder === "asc" ? "▲" : "▼" }}
									</span>
								</span>
							</th>
						</tr>
					</thead>

					<tbody>
						<TableSkeleton
							v-if="isTableLoading"
							v-for="n in perPage"
							:key="'skeleton-' + n"
							:columns="widget.columns?.length"
						/>
						<tr
							v-else
							v-for="(row, index) in paginatedRows"
							:key="index"
						>
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
			<WidgetPagination
				:page="page"
				:per-page="perPage"
				:total-items="filteredRows.length"
				@update:page="page = $event"
				v-if="filteredRows.length > perPage"
			/>
		</div>
	</div>
</template>

<script>
import sortMixin from "../../mixins/sortMixin";
import WidgetPagination from "../UI/WidgetPagination.vue";
import TableSkeleton from "../UI/TableSkeleton.vue";
import BaseSearch from "../UI/BaseSearch.vue";

export default {
	components: { WidgetPagination, TableSkeleton, BaseSearch },
	props: ["widget"],
	mixins: [sortMixin],
	data() {
		return {
			showModal: false,
			selectedWidget: null,
			search: "",
			page: 1,
			perPage: 10,
		};
	},
	computed: {
		isTableLoading() {
			let id;
			if (this.$route.params.uuid) {
				id = this.$route.params.uuid;
			} else if (this.$route.params.url) {
				id = this.$route.params.url;
			}
			console.log();
			return this.$store.getters["TableLoader/isTableLoading"](
				`Widget_${id}`
			);
		},
		filteredRows() {
			if (!this.search) return this.widget.query || [];

			const q = this.search.toLowerCase();
			const c = this.widget.query.filter((row) =>
				Object.values(row).some((val) =>
					String(val).toLowerCase().includes(q)
				)
			);
			return c;
		},

		sortedRows() {
			return this.sortItems(this.filteredRows);
		},

		paginatedRows() {
			const start = (this.page - 1) * this.perPage;
			return this.sortedRows.slice(start, start + this.perPage);
		},
	},

	methods: {
		configure(widget) {
			this.$router.replace(`${this.$route.path}/${widget.uuid}`);
		},
	},
	watch: {
		search() {
			this.page = 1;
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
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	margin-bottom: 0.5rem;
}

.widget-title {
	margin: 0;
	font-size: 1.1rem;
	font-weight: 600;
	white-space: nowrap;
}

.widget-header-actions {
	display: flex;
	align-items: center;
	gap: 0.75rem;
}

.widget-search {
	width: 220px;
}

.widget-actions {
	display: flex;
	align-items: center;
	gap: 0.5rem;
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

	/* 👇 important */
	position: relative;
}

.table-wrapper table {
	border-collapse: separate;
	border-spacing: 0;
}

.table-wrapper thead th {
	position: sticky;
	top: 0;
	z-index: 3;
	background-color: #9cc7f5 !important;
}

td,
th {
	white-space: nowrap;
}
thead {
	background-color: #9cc7f5;
}
.head {
	display: flex;
	flex-direction: row-reverse;
}
.sortable {
	cursor: pointer;
	user-select: none;
}

.sortable span {
	font-size: 0.7rem;
	margin-left: 4px;
}
</style>

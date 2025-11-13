<template>
	<div class="mb-3 position-relative" ref="root">
		<label class="form-label">{{ label }}</label>

		<input
			type="text"
			class="form-control"
			v-model="search"
			:placeholder="placeholder"
			@focus="open = true"
			@input="open = true"
		/>

		<ul
			class="dropdown-menu w-100 show"
			v-if="open"
			style="max-height: 220px; overflow-y: auto"
		>
			<li v-for="opt in filteredOptions" :key="opt.value">
				<button
					type="button"
					class="dropdown-item"
					@click="select(opt)"
				>
					{{ opt.label }}
				</button>
				<slot></slot>
			</li>
			<li v-if="!filteredOptions.length">
				<span class="dropdown-item text-muted">No results found</span>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: "SearchableDropdown",
	props: {
		label: String,
		placeholder: String,
		modelValue: [String, Number, null],
		options: {
			type: Array,
			required: true,
		},
	},
	emits: ["update:modelValue"],
	data() {
		return {
			search: "",
			open: false,
		};
	},
	computed: {
		filteredOptions() {
			const q = this.search.toLowerCase().trim();
			if (!q) return this.options;
			return this.options.filter((o) =>
				String(o.label).toLowerCase().includes(q)
			);
		},
		selectedLabel() {
			return (
				this.options.find((o) => o.value === this.modelValue)?.label ||
				""
			);
		},
	},
	mounted() {
		document.addEventListener("click", this.closeOnOutsideClick);
	},
	beforeUnmount() {
		document.removeEventListener("click", this.closeOnOutsideClick);
	},
	methods: {
		select(opt) {
			this.$emit("update:modelValue", opt.value);
			this.search = opt.label;
			this.open = false;
		},
		closeOnOutsideClick(e) {
			if (!this.$refs.root.contains(e.target)) {
				this.open = false;
			}
		},
	},
};
</script>

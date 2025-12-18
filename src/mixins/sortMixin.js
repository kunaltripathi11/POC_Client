export default {
	data() {
		return {
			sortKey: "",
			sortOrder: "asc", // asc | desc
		};
	},
	methods: {
		sortBy(key) {
			if (this.sortKey === key) {
				this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
			} else {
				this.sortKey = key;
				this.sortOrder = "asc";
			}
		},
		sortItems(items) {
			if (!this.sortKey) return items;

			return [...items].sort((a, b) => {
				const A = a[this.sortKey] ?? "";
				const B = b[this.sortKey] ?? "";

				if (typeof A === "string") {
					return this.sortOrder === "asc"
						? A.localeCompare(B)
						: B.localeCompare(A);
				}

				return this.sortOrder === "asc" ? A - B : B - A;
			});
		},
	},
};

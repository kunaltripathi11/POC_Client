<template>
	<button class="btn btn-sm me-2 action" @click="edit()">
		<font-awesome-icon icon="fa-solid fa-pen" style="color: blue" />
	</button>
	<button class="btn btn-sm action" @click="remove()">
		<font-awesome-icon icon="fa-solid fa-trash" style="color: red" />
	</button>
</template>

<script>
export default {
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
	methods: {
		// 	// edit(item) {
		// 	// 	this.$router.push(`/admin/application/categories/${item.uuid}`);
		// 	// },
		async remove() {
			if (!confirm("Sure? This will hide the Category.")) return;
			this.$emit("removeEvent", this.item.uuid);
		},
	},
};
</script>
<style scoped>
.action {
	border-radius: 30% !important;
}
.action:hover {
	border: 1px solid gray !important;
	border-radius: 30%;
}
</style>

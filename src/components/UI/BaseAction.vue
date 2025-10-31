<template>
	<button class="btn btn-sm me-2 action" @click="$emit('edit')">
		<font-awesome-icon icon="fa-solid fa-pen" style="color: blue" />
	</button>
	<button class="btn btn-sm action" @click="$emit('delete')">
		<font-awesome-icon icon="fa-solid fa-trash" style="color: red" />
	</button>
</template>

<script>
export default {
	emits: ["delete", "edit"],
};
</script>
<style scoped>
.action {
	border: 0.5px solid rgb(202, 202, 202) !important;
	border-radius: 50% !important;
	margin: 3px;
	padding: 5px;
}
/* .action:hover {
	border-radius: 30%;
} */
</style>

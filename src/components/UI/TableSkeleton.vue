<template>
	<tr>
		<td v-for="n in columns" :key="n">
			<div class="skeleton-cell"></div>
		</td>
	</tr>
</template>

<script>
export default {
	props: {
		columns: {
			type: Number,
			required: true,
		},
	},
};
</script>

<style scoped>
.skeleton-cell {
	height: 16px;
	width: 100%;
	border-radius: 6px;
	background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%);
	background-size: 400% 100%;
	animation: rows 1.4s infinite;
}

@keyframes rows {
	0% {
		background-position: 100% 0;
	}
	100% {
		background-position: 0 0;
	}
}
</style>

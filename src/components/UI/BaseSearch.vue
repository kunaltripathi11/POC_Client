<template>
	<div class="search-wrapper" :class="{ focused }">
		<span class="material-icons search-icon">search</span>

		<input
			type="text"
			placeholder="Search..."
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			@focus="focused = true"
			@blur="focused = false"
		/>

		<span
			v-if="modelValue"
			class="material-icons clear-icon"
			@click="$emit('update:modelValue', '')"
		>
			close
		</span>
	</div>
</template>
<script>
export default {
	props: {
		modelValue: String,
	},
	data() {
		return {
			focused: false,
		};
	},
};
</script>
<style scoped>
.search-wrapper {
	display: flex;
	align-items: center;
	gap: 0.7rem;
	background: #f1f5f9;
	border-radius: 999px;
	padding: 0.3rem 0.6rem;
	width: 23vw;
	transition: all 0.2s ease;
	margin-right: 0.6rem;
	margin-bottom: 0.4rem;
}

.search-wrapper.focused {
	background: #ffffff;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.search-wrapper input {
	flex: 1;
	border: none;
	outline: none;
	background: transparent;
	font-size: 14px;
}

.search-icon {
	font-size: 20px;
	color: #64748b;
}

.clear-icon {
	font-size: 18px;
	color: #64748b;
	cursor: pointer;
}
</style>

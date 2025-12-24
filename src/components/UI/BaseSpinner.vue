<template>
	<div class="spinner"></div>
</template>

<style scoped>
.spinner {
	width: 44px;
	height: 44px;
	border: 4px solid #d1d5db;
	border-top-color: #2563eb;
	border-radius: 50%;
	animation: spin 0.9s linear infinite;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>

<template>
	<div class="main container">
		<div class="app" v-for="value in source"></div>
	</div>
</template>

<style scoped>
.main {
	width: 70%;
	padding-left: 7rem;
	padding-top: 6rem;
}
.app {
	height: 50px;
	width: 50px;
	background-color: blue;
}
</style>

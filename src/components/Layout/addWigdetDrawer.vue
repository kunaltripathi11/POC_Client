<template>
	<transition name="slide">
		<!-- <div> -->
		<!-- <div class="icon" :class="!show ? 'open' : 'close'">
				<font-awesome-icon
					icon="fa-solid fa-chevron-left"
					v-if="!show"
				/>
				<font-awesome-icon icon="fa-solid fa-chevron-right" v-else />
			</div> -->
		<div v-if="show" class="offcanvas offcanvas-end show widgetDrawer">
			<div class="offcanvas-header border-bottom">
				<h5 class="offcanvas-title text-center">Add Widget</h5>
			</div>
			<div class="offcanvas-body">
				<div class="list-group">
					<button class="btn" v-for="widget in widgets">
						{{ widget.toUpperCase() }}
					</button>
				</div>
			</div>
		</div>
		<!-- </div> -->
	</transition>
</template>
<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			widgets: [
				"Chart",
				"Cockpit",
				"Data Table",
				"data set",
				"Filter Bar",
			],
		};
	},
};
</script>
<style scoped>
.icon {
	cursor: pointer;
	background-color: rgb(99, 105, 110);
	position: absolute;
	top: 45%;

	height: 4rem;
	width: 20px;
	display: flex;
	align-items: center;
	z-index: 10001;
	border-radius: 10%;
}
.close {
	right: 19.7vw;
}
.open {
	right: 0;
}
button {
	border: 1pm solid black;
	margin: 3px;
}
.widgetDrawer {
	padding: 1rem;
	background-color: aliceblue;

	/* border: 2px solid black; */
	position: absolute;
	right: 0;
	top: 4rem;
	visibility: visible;
	z-index: 1000;
	height: calc(100vh - 4rem);
	width: 20vw;

	/* box-shadow: 1px black; */
}
.slide-enter-active,
.slide-leave-active {
	transition: transform 1s ease;
}
.slide-enter-from,
.slide-leave-to {
	transform: translateX(100%);
}
</style>

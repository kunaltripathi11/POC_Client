<template>
	<div class="container main">
		<div class="header">
			<div class="back">
				<router-link to="/admin/application/solution-categories">
					<font-awesome-icon icon="fa-solid fa-arrow-left" />
					<span>Back to Dashboard</span></router-link
				>
			</div>
			<div class="heading">
				<h2 class="fw-semibold">Add Solution Category</h2>
			</div>
		</div>

		<form @submit.prevent="onSubmit" class="container mt-4">
			<div class="mb-4">
				<p class="text-muted small">
					Enter Unique title for Solution Category
				</p>
			</div>
			<div>
				<!-- <label for="title"> Title *</label> -->
				<input
					id="title"
					type="text"
					v-model.trim="formdata.title"
					placeholder="Enter Title *"
					class="form-control"
					required
					:class="{ 'is-invalid': errors.title }"
				/>
			</div>
			<div v-if="errors.title" class="invalid">{{ errors.title }}</div>
			<div class="p-2">
				<button type="submit" class="btn btn-primary p-1">
					Submit
				</button>
				<button type="reset" class="btn btn-primary p-1 m-1">
					Reset
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			formdata: {
				title: this.title || "",
			},
			errors: {
				title: "",
			},
		};
	},
};
</script>

<style scoped>
a {
	text-decoration: none;
}
.main {
	margin: 5rem 20rem;
	padding: 0.6rem;
	width: 65vw;
	height: 80vh;
	background: #f9fafb;
	border: 1px solid #e5e7eb;
	border-radius: 7px;

	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

.header {
	border: 1px solid gray;
	border-radius: 10px;
	/* margin: 0.7rem; */

	.back {
		width: 100%;
		border-bottom: 1px solid black;
		padding: 0.7rem;
	}
	.heading {
		padding: 0.4rem;
	}
}
</style>

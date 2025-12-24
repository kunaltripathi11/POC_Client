<template>
	<div class="not-found">
		<div class="content">
			<h1>404</h1>
			<h2>Page Not Found</h2>
			<p>The page you are looking for doesn’t exist or has been moved.</p>

			<div class="actions">
				<router-link to="/launchpad" class="btn primary">
					Go to Launchpad
				</router-link>
				<router-link to="/" class="btn secondary"> Home </router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "NotFound",
};
</script>

<style scoped>
.not-found {
	min-height: calc(100vh - --header-height);
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f9fbfd;
	font-family: "Inter", sans-serif;
}

.content {
	text-align: center;
	padding: 2rem;
	max-width: 480px;
}

h1 {
	font-size: 6rem;
	font-weight: 800;
	color: #1846e8;
	margin-bottom: 0.5rem;
}

h2 {
	font-size: 1.6rem;
	font-weight: 600;
	color: #1e293b;
	margin-bottom: 0.8rem;
}

p {
	color: #64748b;
	font-size: 1rem;
	margin-bottom: 2rem;
}

.actions {
	display: flex;
	gap: 1rem;
	justify-content: center;
}

.btn {
	padding: 10px 18px;
	border-radius: 8px;
	font-size: 14px;
	font-weight: 500;
	text-decoration: none;
	transition: all 0.2s ease;
}

.primary {
	background: #1846e8;
	color: white;
}

.primary:hover {
	background: #133bbd;
}

.secondary {
	background: #e2e8f0;
	color: #1e293b;
}

.secondary:hover {
	background: #cbd5e1;
}
</style>

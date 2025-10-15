<template>
	<nav class="navbar navbar-expand-lg shadow-lg fixed-top">
		<font-awesome-icon
			icon="fa-solid fa-bars"
			size="xl"
			style="color: #ffffff"
			class="sidebar-toggle"
		/>
		<div class="container-fluid text-white">
			<span class="brand-name px-2"
				><img
					src="/kpmg.svg"
					alt="Kpmg Icon"
					width="100px"
					height="50px"
			/></span>
			<div>
				<div class="nav-items">
					<span
						><font-awesome-icon
							icon="fa-solid fa-book"
							size="lg"
							style="color: white" /></span
					><span>&nbsp;Sofy Docs</span>
				</div>
				<div class="nav-items">
					<span
						><span
							><font-awesome-icon
								icon="fa-solid fa-gears"
								size="lg"
								style="color: white" /></span
						>&nbsp;Administration</span
					>
				</div>
				<div class="nav-items">
					<span
						><span
							><font-awesome-icon
								icon="fa-regular fa-star"
								size="lg"
								style="color: #ffffff" /></span
						>&nbsp;Quick Links</span
					>
				</div>

				<div class="dropdown" style="display: inline">
					<button data-bs-toggle="dropdown">
						<div class="nav-items">
							<span>
								<font-awesome-icon
									icon="fa-solid fa-user"
									size="lg"
									style="color: white"
								/>
							</span>
						</div>
					</button>
					<ul class="dropdown-menu">
						<li>
							<a class="dropdown-item" href="#">Name</a>
						</li>
						<li>
							<a class="dropdown-item" href="#">Role</a>
						</li>
						<li>
							<a class="dropdown-item" href="#"
								>Change Password</a
							>
						</li>
						<li>
							<a class="dropdown-item" href="#">Logout</a>
						</li>
						<li>
							<a class="dropdown-item" href="#"
								>Account Details</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</template>

<style scoped>
.navbar {
	background: rgb(0, 51, 141);
	max-height: 4rem;
	height: 4rem;
	padding: 0;
	padding-left: 0.7rem;
}

.nav-items {
	cursor: pointer;
	display: inline;
	padding: 0 0.5rem;
}

.sidebar-toggle,
.brand-name {
	cursor: pointer;
}
button {
	background: none;
	border: none;
}
.dropdown-menu {
	left: -7.5rem !important;
	top: 2.4rem;
}
</style>

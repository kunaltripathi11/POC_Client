<template>
	<div class="login-wrapper">
		<div class="login-card">
			<h2 class="title">Sign in</h2>
			<p class="subtitle">Welcome back! Please login to your account</p>

			<form @submit.prevent="loginUser" novalidate>
				<div class="form-group">
					<label>Username</label>
					<input
						type="text"
						v-model.trim="form.username"
						placeholder="Enter your username"
						@blur="validateUsername"
					/>
					<small v-if="errors.username" class="error">
						{{ errors.username }}
					</small>
				</div>

				<div class="form-group">
					<label>Password</label>
					<input
						type="password"
						v-model="form.password"
						placeholder="Enter your password"
						@blur="validatePassword"
					/>
					<small v-if="errors.password" class="error">
						{{ errors.password }}
					</small>
				</div>

				<button
					type="submit"
					class="btn"
					:disabled="isInvalid || loading"
				>
					{{ loading ? "Signing in..." : "Login" }}
				</button>

				<p class="forgot">
					<router-link to="/forgot-password">
						Forgot password?
					</router-link>
				</p>

				<p v-if="error" class="error global-error">
					{{ error }}
				</p>
			</form>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
	data() {
		return {
			form: {
				username: "",
				password: "",
			},
			errors: {
				username: null,
				password: null,
			},
		};
	},

	computed: {
		...mapState("Auth", ["loading", "error"]),

		isInvalid() {
			return (
				!!this.errors.username ||
				!!this.errors.password ||
				!this.form.username ||
				!this.form.password
			);
		},
	},

	methods: {
		...mapActions("Auth", ["login"]),

		validateUsername() {
			if (!this.form.username) {
				this.errors.username = "Username is required";
			} else if (this.form.username.length < 3) {
				this.errors.username = "Username must be at least 3 characters";
			} else {
				this.errors.username = null;
			}
		},

		validatePassword() {
			if (!this.form.password) {
				this.errors.password = "Password is required";
			} else if (this.form.password.length < 8) {
				this.errors.password = "Password must be at least 8 characters";
			} else {
				this.errors.password = null;
			}
		},

		validateForm() {
			this.validateUsername();
			this.validatePassword();

			return !this.errors.username && !this.errors.password;
		},

		async loginUser() {
			if (!this.validateForm()) return;

			const success = await this.login(this.form);

			if (success) {
				this.$router.replace("/launchpad");
			}
		},
	},
};
</script>

<style scoped>
.login-wrapper {
	height: 100vh;
	width: calc(100vw);
	margin-top: -4rem;
	display: flex;
	align-items: center;
	justify-content: center;

	background-image: url("/login-bg.jpg");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;

	font-family: "Inter", sans-serif;
}

.login-card {
	background-color: rgb(248, 245, 239);
	width: 24vw;
	padding: 2rem;
	border-radius: 12px;
	text-align: center;
	height: 64vh;
}

.title {
	font-size: 1.6rem;
	font-weight: 700;
	color: #1e293b;
	margin-bottom: 0.3rem;
}

.subtitle {
	font-size: 0.9rem;
	color: #64748b;
	margin-bottom: 1.5rem;
}

.form-group {
	text-align: left;
	margin-bottom: 1rem;
}

.form-group label {
	font-size: 0.85rem;
	font-weight: 600;
	color: #334155;
	margin-bottom: 0.3rem;
	display: block;
}

.form-group input {
	width: 100%;
	padding: 0.6rem 0.75rem;
	border: 1px solid #cbd5e1;
	border-radius: 6px;
	font-size: 0.9rem;
	transition: border-color 0.2s;
}

.form-group input:focus {
	outline: none;
	border-color: #2563eb;
}

.btn {
	width: 100%;
	margin-top: 0.8rem;
	padding: 0.6rem;
	background: #2563eb;
	color: white;
	font-size: 0.95rem;
	font-weight: 600;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: background 0.2s;
}

.btn:hover {
	background: #1e40af;
}

.btn:disabled {
	background: #93c5fd;
	cursor: not-allowed;
}

.forgot {
	margin-top: 1rem;
	font-size: 0.85rem;
}

.forgot a {
	color: #2563eb;
	text-decoration: none;
	font-weight: 500;
}

.forgot a:hover {
	text-decoration: underline;
}
.error {
	color: #dc2626;
	font-size: 0.8rem;
	margin-top: 0.25rem;
	display: block;
}

.global-error {
	margin-top: 0.8rem;
	text-align: center;
}

@media (max-width: 480px) {
	.login-card {
		width: 90%;
	}
}
</style>

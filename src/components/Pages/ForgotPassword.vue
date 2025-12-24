<template>
	<div class="login-wrapper">
		<div class="login-card">
			<h2 class="title">Forgot Password</h2>
			<p class="subtitle">
				Enter your registered email to receive a reset link
			</p>

			<form @submit.prevent="submit" novalidate>
				<div class="form-group">
					<label>Email</label>
					<input
						type="email"
						v-model.trim="email"
						placeholder="Enter your email"
						@blur="validateEmail"
					/>

					<small v-if="error" class="error">
						{{ error }}
					</small>
				</div>

				<button
					type="submit"
					class="btn"
					:disabled="isInvalid || loading"
				>
					{{ loading ? "Sending..." : "Send Reset Link" }}
				</button>

				<p class="forgot">
					<router-link to="/login">Back to login</router-link>
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
			email: "",
			error: null,
		};
	},

	computed: {
		...mapState("Auth", ["loading"]),

		isInvalid() {
			return !this.email || !!this.error;
		},
	},

	methods: {
		...mapActions("Auth", ["forgotPassword"]),

		validateEmail() {
			const regex =
				/^[A-Za-z][^\s@!#$%^&*()|]+@[^\s@!#$%^&*()|]+\.[^\s@!#$%^&*()|\d]+$/;
			if (!this.email) {
				this.error = "Email is required";
			} else if (!regex.test(this.email)) {
				this.error = "Enter a valid email address";
			} else {
				this.error = null;
			}
		},

		async submit() {
			this.validateEmail();
			if (this.error) return;

			const success = await this.forgotPassword({ email: this.email });

			if (success) {
				this.email = "";
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

.password-wrapper {
	position: relative;
}

.toggle {
	position: absolute;
	right: 10px;
	top: 0.75rem;
	cursor: pointer;
	color: #475569;
	font-size: 1rem;
}

@media (max-width: 480px) {
	.login-card {
		width: 90%;
	}
}
</style>

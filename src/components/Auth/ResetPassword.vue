<template>
	<div class="login-wrapper">
		<div class="login-card">
			<h2 class="title">Reset Password</h2>
			<p class="subtitle">Choose a strong new password</p>

			<form @submit.prevent="submit" novalidate>
				<div class="form-group">
					<label>New Password</label>
					<div class="password-wrapper">
						<input
							:type="showPassword ? 'text' : 'password'"
							v-model="form.newPassword"
							placeholder="New password"
							@blur="validatePassword"
						/>
						<span class="toggle" @click="updateShowPass">
							<font-awesome-icon
								:icon="
									showPassword
										? 'fa-regular fa-eye'
										: 'fa-regular fa-eye-slash'
								"
							/>
						</span>
						<small v-if="errors.newPassword" class="error">
							{{ errors.newPassword }}
						</small>
					</div>
				</div>

				<div class="form-group">
					<label>Confirm Password</label>
					<div class="password-wrapper">
						<input
							:type="showConfirmPassword ? 'text' : 'password'"
							v-model="form.confirmPassword"
							placeholder="Confirm password"
							@blur="validateConfirm"
						/>
						<span class="toggle" @click="updateShowConfirmPass">
							<font-awesome-icon
								:icon="
									showConfirmPassword
										? 'fa-regular fa-eye'
										: 'fa-regular fa-eye-slash'
								"
							/>
						</span>
						<small v-if="errors.confirmPassword" class="error">
							{{ errors.confirmPassword }}
						</small>
					</div>
				</div>

				<button class="btn" :disabled="isInvalid || loading">
					{{ loading ? "Resetting..." : "Reset Password" }}
				</button>

				<p v-if="message" class="success">{{ message }}</p>
				<p v-if="error" class="error global-error">{{ error }}</p>
			</form>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	data() {
		return {
			showPassword: false,
			showConfirmPassword: false,
			form: {
				newPassword: "",
				confirmPassword: "",
			},
			errors: {
				newPassword: null,
				confirmPassword: null,
			},
			loading: false,
			error: null,
			message: null,
		};
	},

	computed: {
		isInvalid() {
			return (
				!!this.errors.newPassword ||
				!!this.errors.confirmPassword ||
				!this.form.newPassword ||
				!this.form.confirmPassword
			);
		},
	},

	methods: {
		updateShowPass() {
			this.showPassword = !this.showPassword;
		},
		updateShowConfirmPass() {
			this.showConfirmPassword = !this.showConfirmPassword;
		},

		validatePassword() {
			const strong =
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;

			if (!this.form.newPassword) {
				this.errors.newPassword = "Password is required";
			} else if (!strong.test(this.form.newPassword)) {
				this.errors.newPassword =
					"Min 8 chars, uppercase, lowercase, number & special char";
			} else {
				this.errors.newPassword = null;
			}
		},

		validateConfirm() {
			if (this.form.confirmPassword !== this.form.newPassword) {
				this.errors.confirmPassword = "Passwords do not match";
			} else {
				this.errors.confirmPassword = null;
			}
		},
		...mapActions("Auth", ["resetPassword"]),
		async submit() {
			this.validatePassword();
			this.validateConfirm();
			if (this.isInvalid) return;

			const token = this.$route.query.token;
			if (!token) {
				this.error = "Invalid or expired reset link";
				return;
			}
			const success = await this.resetPassword({
				newPassword: this.form.newPassword,
				token: token,
			});

			if (success) {
				setTimeout(() => this.$router.replace("/login"), 1000);
			} else {
				this.$router.replace("/forgot_password");
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

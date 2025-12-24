<template>
	<div class="login-wrappers">
		<div class="login-card">
			<h2 class="title">Change Password</h2>
			<p class="subtitle">
				Please enter your old password and choose a new one
			</p>

			<form @submit.prevent="submit" novalidate>
				<div class="form-group">
					<label>Old Password</label>
					<div class="password-wrapper">
						<input
							:type="showOldPassword ? 'text' : 'password'"
							v-model="form.oldPassword"
							placeholder="Enter old password"
							@blur="validateOldPassword"
						/>
						<span class="toggle" @click="updateShowOldPass">
							<font-awesome-icon
								:icon="
									showOldPassword
										? 'fa-regular fa-eye'
										: 'fa-regular fa-eye-slash'
								"
							/>
						</span>
						<small v-if="errors.oldPassword" class="error">
							{{ errors.oldPassword }}
						</small>
					</div>
				</div>

				<div class="form-group">
					<label>New Password</label>
					<div class="password-wrapper">
						<input
							:type="showPassword ? 'text' : 'password'"
							v-model="form.newPassword"
							placeholder="Enter new password"
							@blur="validateNewPassword"
							@input="validateNewPassword"
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

				<button
					type="submit"
					class="btn"
					:disabled="isInvalid || loading"
				>
					{{ loading ? "Updating..." : "Change Password" }}
				</button>

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
			showPassword: false,
			showOldPassword: false,
			form: {
				oldPassword: "",
				newPassword: "",
			},
			errors: {
				oldPassword: null,
				newPassword: null,
			},
		};
	},

	computed: {
		...mapState("Auth", ["loading", "error"]),

		isInvalid() {
			return (
				!!this.errors.oldPassword ||
				!!this.errors.newPassword ||
				!this.form.oldPassword.trim() ||
				!this.form.newPassword.trim()
			);
		},
	},

	methods: {
		...mapActions("Auth", ["changePassword"]),
		updateShowPass() {
			this.showPassword = !this.showPassword;
		},
		updateShowOldPass() {
			this.showOldPassword = !this.showOldPassword;
		},
		validateOldPassword() {
			if (!this.form.oldPassword) {
				this.errors.oldPassword = "Old password is required";
			} else {
				this.errors.oldPassword = null;
			}
		},

		validateNewPassword() {
			const password = this.form.newPassword;
			const hasLowercase = /[a-z]/.test(password);
			const hasUppercase = /[A-Z]/.test(password);
			const hasDigit = /\d/.test(password);
			const hasSpecial = /[@$!%*?#&]/.test(password);

			if (!password) {
				this.errors.newPassword = "New password is required";
			} else if (password === this.form.oldPassword) {
				this.errors.newPassword =
					"New password must be different from old password";
			} else if (password.length < 8) {
				this.errors.newPassword =
					"Password must be at least 8 characters";
			} else if (!hasLowercase) {
				this.errors.newPassword =
					"Password must include lowercase character";
			} else if (!hasUppercase) {
				this.errors.newPassword = "Password must uppercase character";
			} else if (!hasDigit) {
				this.errors.newPassword = "Password must include number";
			} else if (!hasSpecial) {
				this.errors.newPassword = "Password must special character";
			} else {
				this.errors.newPassword = null;
			}
		},

		validateForm() {
			this.validateOldPassword();
			this.validateNewPassword();

			return !this.errors.oldPassword && !this.errors.newPassword;
		},

		async submit() {
			if (!this.validateForm()) return;

			const success = await this.changePassword(this.form);

			if (success) {
				this.form.oldPassword = "";
				this.form.newPassword = "";
				this.$router.replace("/login");
			}
		},
	},
};
</script>

<style scoped>
.login-wrappers {
	height: 100vh;
	width: calc(100vw);
	margin-top: -4rem;
	display: flex;
	align-items: center;
	justify-content: center;

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

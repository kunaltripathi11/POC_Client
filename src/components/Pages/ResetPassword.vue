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
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

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
			}
		},
	},
};
</script>

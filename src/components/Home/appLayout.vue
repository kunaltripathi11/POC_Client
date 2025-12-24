<template>
	<div class="main">
		<div class="greeting-bar">
			<h2 class="greeting-text">
				{{ greet }}, <span class="user-name">{{ nameOfUser }}</span>
			</h2>
		</div>
		<div class="category-top-bar container">
			<div
				v-for="cat in sol_categories"
				:key="cat"
				class="category"
				:class="{ activeCat: selectedSolutionCategory === cat }"
				@click="selectedSolutionCategory = cat"
			>
				{{ cat === "No Solution Category" ? "Others" : cat }}
			</div>
		</div>
		<div class="main-content container mt-4">
			<div
				v-for="(apps, category) in filteredBySolution"
				:key="category"
				class="category-section mb-5"
			>
				<h5 class="fw-bold mb-3 category-title">
					{{ category === "Uncategorized" ? "Others" : category }}
				</h5>

				<div class="app-grid">
					<div
						v-for="app in apps"
						:key="app.id"
						class="app-card"
						@click="goToApp(app)"
						:class="app.active ? 'activeApp' : 'inactiveApp'"
					>
						<div class="app-content">
							<span class="material-icons app-icon">
								{{ app.icon ? app.icon.toLowerCase() : "apps" }}
							</span>
							<p class="app-title">{{ app.title }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			isLoading: true,
			selectedSolutionCategory: "All",
			selectedCategory: "All",
		};
	},
	computed: {
		...mapGetters("Auth", ["Name"]),
		...mapGetters("Application", ["categorizedApplications"]),

		greet() {
			const hour = new Date().getHours();
			if (hour < 12) return "Good Morning";
			if (hour < 17) return "Good Afternoon";
			return "Good Evening";
		},
		nameOfUser() {
			return this.Name.split(" ")[0];
		},

		sol_categories() {
			const set = new Set();
			let noSolCat = false;

			Object.values(this.categorizedApplications || {}).forEach(
				(applist) => {
					applist.forEach((app) => {
						if (
							app.solution_title &&
							app.solution_title.trim() !== ""
						) {
							set.add(app.solution_title);
						} else {
							noSolCat = true;
						}
					});
				}
			);
			const list = ["All", ...Array.from(set)];
			if (noSolCat) {
				list.push("No Solution Category");
			}
			return list;
		},

		filteredBySolution() {
			const selected = this.selectedSolutionCategory;
			if (selected === "All") return this.orderedApplications;

			const filtered = {};
			for (const category in this.orderedApplications) {
				const apps = this.orderedApplications[category];
				const match = apps.filter((app) => {
					if (selected === "No Solution Category") {
						return (
							!app.solution_title ||
							app.solution_title.trim() === ""
						);
					}
					return app.solution_title === selected;
				});
				if (match.length > 0) {
					filtered[category] = match;
				}
			}
			return filtered;
		},
		orderedApplications() {
			if (!this.categorizedApplications) return {};

			const apps = { ...this.categorizedApplications };
			const ordered = {};
			const keys = Object.keys(apps).filter((k) => k !== "Uncategorized");
			keys.sort();
			keys.forEach((k) => (ordered[k] = apps[k]));
			if (apps["Uncategorized"])
				ordered["Uncategorized"] = apps["Uncategorized"];
			return ordered;
		},
	},
	methods: {
		...mapActions("Application", ["fetchApplications"]),

		goToApp(app) {
			this.$router.push(app.url);
			console.log("APPP", app);
			this.$store.commit("SET_DASH_UUID", app.dashboard_uuid);
		},
	},
	async mounted() {
		try {
			await this.fetchApplications();
		} finally {
			this.isLoading = false;
		}
	},
};
</script>

<style scoped>
.main {
	min-height: 100vh;
	background: #f9fbfd;
	font-family: "Inter", sans-serif;
}

.greeting-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 0 3rem;
	padding-top: 1rem;

	margin: 0 auto 1rem;
	width: 75%;
}

.greeting-text {
	font-size: 1.6rem;
	font-weight: 600;
	color: #1e293b;
}

.user-name {
	color: #1846e8;
}

.category-title {
	font-size: 1.2rem;
	font-weight: 600;
	color: #0f172a;
	margin-bottom: 1rem;
	border-left: 4px solid #1846e8;
	padding-left: 10px;
}

.app-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
	gap: 18px;
}

.app-card {
	position: relative;
	background: #1846e8;
	color: #fff;
	height: 140px;
	border-radius: 12px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transition: all 0.2s ease-in-out;
	cursor: pointer;
	text-align: center;
	box-shadow: 0 2px 6px rgba(24, 70, 232, 0.15);
}

.inactiveApp {
	background-color: #5a5a5b;
	opacity: 0.6;
	pointer-events: none;
	cursor: not-allowed;
}

.app-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 6px 16px rgba(24, 70, 232, 0.25);
}

.app-icon {
	font-size: 28px;
	margin-bottom: 8px;
}

.app-title {
	font-size: 14px;
	font-weight: 500;
	text-transform: capitalize;
	max-width: 130px;
	word-wrap: break-word;
	line-height: 1.2;
}

.category-top-bar {
	display: flex;
	gap: 1rem;
	overflow-x: auto;
	padding: 0.3rem 4rem;
	margin-bottom: 1.2rem;
	scrollbar-width: none;
}
.category-top-bar::-webkit-scrollbar {
	display: none;
}
.category {
	padding: 6px 14px;
	background: #e2e8f0;
	color: #1e293b;
	border-radius: 20px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	white-space: nowrap;
	transition: 0.2s;
}

.activeCat {
	background: #1846e8;
	color: #fff;
}

@media (max-width: 768px) {
	.greeting-bar {
		flex-direction: column;
		text-align: center;
	}
	.greeting-text {
		font-size: 1.3rem;
	}
	.app-grid {
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
	}
}
</style>

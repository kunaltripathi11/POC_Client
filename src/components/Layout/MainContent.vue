<template>

    <!-- <nav class="navbar navbar-expand-lg shadow-lg fixed-top">
        <div class="container-fluid px-4">
            <router-link class="navbar-brand fw-bold" to="/">
                <span class="brand-name px-2"><img src="/kpmg.svg" alt="Kpmg Icon" width="100px" height="50px"></span>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

        </div>
    </nav> -->
</template>


<!-- <script>
export default {
    name: "NavBar",
    computed: {
        userLoggedIn() {
            return this.$store.getters["auth/isLoggedIn"];
        },
        userId() {
            return this.$store.getters["auth/getUserId"];
        },
        error() {
            return this.$store.getters["auth/getError"];
        },
    },
    methods: {
        async logout() {
            try {
                await this.$store.dispatch("auth/logout");
                console.log("Logout successful");
                this.$router.push("/");
            } catch (err) {
                console.error("Logout failed", err);
            }
        },
    },
};
</script>

<style scoped>
.navbar {
    background: rgb(5, 5, 56);
    max-height: 4rem;
    height: 4rem;
}
</style> -->
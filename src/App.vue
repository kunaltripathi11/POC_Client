<template>
  <div>

    <Header></Header>
    <Sidebar></Sidebar>
    <main-content></main-content>
  </div>







</template>

<script>
import Header from "./components/Layout/header.vue";
import MainContent from "./components/Layout/MainContent.vue";
import Sidebar from "./components/Layout/sidebar.vue";


export default {
  components: {
    Header,
    Sidebar,
    MainContent,
  },
};
</script>

<style></style>

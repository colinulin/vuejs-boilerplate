<template>
    <div id="app">
        <Header />
        <div class="container mb-5 mt-5"><router-view /></div>
        <Footer />
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "App",
    components: {
        Header,
        Footer
    },
    data() {
        return {};
    }
};
</script>

<style></style>

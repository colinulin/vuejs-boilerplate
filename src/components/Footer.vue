<template>
    <div class="jumbotron mb-0">
        <div class="container">
            <div class="row">
                <div class="col">
                    <router-link to="/">
                        <img :src="logo" alt="Aspire Logo" class="logo" />
                    </router-link>
                    <p class="copyright-text mt-4">
                        &copy; {{ year }} Colin Ulin.
                    </p>
                </div>
                <div class="col">
                    <ul class="nav justify-content-end">
                        <li class="nav-item">
                            <router-link
                                :to="{ name: 'PrivacyPolicy' }"
                                class="nav-link"
                                active-class="active"
                            >
                                Privacy Policy
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                :to="{ name: 'ToS' }"
                                class="nav-link"
                                active-class="active"
                            >
                                Terms of Service
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                :to="{ name: 'About' }"
                                class="nav-link"
                                active-class="active"
                            >
                                About
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                :to="{ name: 'Contact' }"
                                class="nav-link"
                                active-class="active"
                            >
                                Contact
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Footer",

    data() {
        return {};
    },
    computed: {
        logo() {
            return require("./../assets/logo.png");
        },
        year() {
            const d = new Date();
            return d.getFullYear();
        }
    }
};
</script>

<style lang="css" scoped>
.logo {
  max-height: 60px;
}
.copyright-text {
  font-size: 12px;
}
</style>

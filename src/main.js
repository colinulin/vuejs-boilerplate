import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import App from "./App";

import router from "./router";
import { store } from "./store/store";

/* Axios Setup */
axios.defaults.baseURL = process.env.SERVER_URL;
axios.defaults.headers.get["Accepts"] = "application/json";
axios.defaults.withCredentials = true;

const reqInterceptor = axios.interceptors.request.use(config => {
    console.log("Request Interceptor", config);
    return config;
});
const resInterceptor = axios.interceptors.response.use(res => {
    console.log("Response Interceptor", res);
    return res;
});

axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);

/* Bootstrap setup and CSS import */
import "./styles/style.scss";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

/* Use Icons */
// import "vue-awesome/icons/brands/linkedin-in";
// import Icon from 'vue-awesome/components/Icon'
// Vue.component("v-icon", Icon);

/* Update Titles and Metadata with Vue Router */
router.beforeEach((to, from, next) => {
    const siteName = "VueJSBoiler";

    const nearestWithTitle = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    document.title = siteName;
    if (nearestWithTitle)
        document.title = nearestWithTitle.meta.title + " | " + siteName;

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
        el => el.parentNode.removeChild(el)
    );

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags
        .map(tagDef => {
            const tag = document.createElement("meta");

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key]);
            });

            // We use this to track which meta tags we create, so we don't interfere with other ones.
            tag.setAttribute("data-vue-router-controlled", "");

            return tag;
        })
        // Add the meta tags to the document head.
        .forEach(tag => document.head.appendChild(tag));

    next();
});

/* Vue general configuration */
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
});

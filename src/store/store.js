import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

/* Vuex setup */
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export const store = new Vuex.Store({
    state: {
        authenticated: false
    },
    getters,
    mutations,
    actions,
    modules: {},
    plugins: [vuexLocal.plugin]
});

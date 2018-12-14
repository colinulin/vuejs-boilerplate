import * as types from "./../types";
import router from "./../../router/";

import axios from "axios";

export default {
    actions: {
        [types.REGISTER]: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/auth/register", payload)
                    .then(res => {
                        if (res.data.success) {
                            commit(types.MUTATE_LOG_IN, res.data);
                            router.push({ name: "Home" });
                        }
                        resolve(res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        },
        [types.LOG_IN]: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/auth/login", payload)
                    .then(res => {
                        if (res.data.success) {
                            commit(types.MUTATE_LOG_IN, res.data);
                            router.push({ name: "Home" });
                        }
                        resolve(res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        },
        [types.LOG_OUT]: ({ commit }) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit(types.MUTATE_LOG_OUT);
                    resolve();
                }, 1000);
            });
        }
    },
    getters: {
        [types.GET_AUTH]: state => {
            if (state.user && state.authenticated)
                return state.authenticated;

            return false;
        },
        [types.GET_TOKEN]: state => {
            return state.token;
        }
    },
    mutations: {
        [types.MUTATE_LOG_OUT]: state => {
            state.authenticated = false;
            state.token = "";
            state.user = {};
        },
        [types.MUTATE_LOG_IN]: (state, payload) => {
            state.authenticated = true;
            state.token = payload.token;
            state.user = payload.user;
        }
    }
};
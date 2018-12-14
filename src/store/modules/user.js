import _unionBy from "lodash/unionBy";
import * as types from "./../types";
import router from "./../../router/";

import axios from "axios";

export default {
    actions: {
        [types.UPDATE_USER_DETAILS]: ({ commit, state }, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/users/${state.user._id}/update`, payload, {
                        headers: {
                            Authorization: "Bearer " + state.token
                        }
                    })
                    .then(res => {
                        if (res.data.success) {
                            commit(types.MUTATE_LOG_IN, res.data);
                        }
                        resolve(res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        },
        [types.UPDATE_PROFILE_PICTURE]: ({ commit, state }, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post(
                        `/api/users/${state.user._id}/profile_picture`,
                        payload,
                        {
                            headers: {
                                Authorization: "Bearer " + state.token,
                                "Content-Type": "multipart/form-data"
                            }
                        }
                    )
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        },
        [types.GET_CURRENT_USER]: ({ commit, state }) => {
            return new Promise((resolve, reject) => {
                axios
                    .post(
                        "/api/users/current",
                        {},
                        {
                            headers: { Authorization: "Bearer " + state.token }
                        }
                    )
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        },
        // create new user
        [types.CREATE_USER]: ({ commit, state }, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/users/create`, payload, {
                        headers: { Authorization: "Bearer " + state.token }
                    })
                    .then(res => {
                        if (res.data.success) {
                            let users = state.users;
                            users.push(res.data.user);
                            commit(types.MUTATE_USERS, users);
                        }
                        resolve(res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        },
        // create new user
        [types.UPDATE_USER]: ({ commit, state }, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/users/${payload._id}/update`, payload, {
                        headers: { Authorization: "Bearer " + state.token }
                    })
                    .then(res => {
                        if (res.data.success) {
                            const users = _unionBy(
                                [res.data.user],
                                state.users,
                                "_id"
                            );
                            commit(types.MUTATE_USERS, users);
                        }
                        resolve(res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        },
        // load, mutate, and get users
        [types.LOAD_USERS]: ({ commit, state }, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/api/users`, {
                        headers: { Authorization: "Bearer " + state.token }
                    })
                    .then(res => {
                        if (res.data.success) {
                            commit(types.MUTATE_USERS, res.data.users);
                        }
                        resolve(res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }
    },
    getters: {
        [types.GET_USER_DETAILS]: state => {
            if (state.user) {
                return state.user;
            } else {
                return {};
            }
        },
        [types.GET_USERS]: state => {
            return state.users;
        }
    },
    mutations: {
        [types.MUTATE_USER_DETAILS]: (state, payload) => {
            state.user = payload.user;
        },
        [types.MUTATE_USERS]: (state, payload) => {
            state.users = payload;
        }
    }
};

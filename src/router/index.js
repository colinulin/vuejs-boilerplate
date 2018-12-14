import Vue from "vue";
import Router from "vue-router";

import * as types from "./../store/types";
import { store } from "./../store/store";

import Home from "./../components/pages/Home";
import Login from "./../components/pages/Login";
import Register from "./../components/pages/Register";
import About from "./../components/pages/About";
import Contact from "./../components/pages/Contact";
import PrivacyPolicy from "./../components/pages/PrivacyPolicy";
import TermsOfService from "./../components/pages/TermsOfService";
import NotFound from "./../components/pages/NotFound";

import admin from "./admin";
import users from "./users";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
            beforeEnter: (to, from, next) => {
                if (!store.getters[types.GET_AUTH]) {
                    next();
                } else {
                    next({ name: "Learn" });
                }
            }
        },
        {
            path: "/register",
            name: "Register",
            component: Register,
            meta: {
                title: "Register"
            }
        },
        {
            path: "/about",
            name: "About",
            component: About,
            meta: {
                title: "About Us"
            }
        },
        {
            path: "/contact",
            name: "Contact",
            component: Contact,
            meta: {
                title: "Contact"
            }
        },
        {
            path: "/privacy-policy",
            name: "PrivacyPolicy",
            component: PrivacyPolicy,
            meta: {
                title: "Privacy Policy"
            }
        },
        {
            path: "/terms-of-service",
            name: "ToS",
            component: TermsOfService,
            meta: {
                title: "Terms of Service"
            }
        },
        {
            path: "/logout",
            name: "Logout",
            beforeEnter: (to, from, next) => {
                store.dispatch(types.LOG_OUT).then(() => {
                    next({ name: "Login" });
                });
            }
        },
        admin,
        {
            path: "*",
            name: "NotFound",
            component: NotFound,
            meta: {
                title: "Whoops! Page not found!"
            }
        }
    ]
});

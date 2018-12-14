<template>
    <div class="jumbotron pt-4 pb-0">
        <div class="navigation container">
            <div class="row">
                <div class="col pb-4">
                    <router-link to="/">
                        <img :src="logo" alt="Aspire Logo" class="logo" />
                    </router-link>
                </div>
                <div class="flex-column d-flex">
                    <div class="col text-right">
                        <span class="pr-3" v-if="user.name">
                            Hello,
                            <router-link
                                :to="{
                                    name: 'UserEdit',
                                    params: { userId: user._id }
                                }"
                                >{{ user.name }}</router-link
                            >!
                        </span>
                    </div>
                    <div class="col align-bottom">
                        <ul class="nav nav-tabs justify-content-end">
                            <template v-if="authenticated">
                                <li class="nav-item dropdown">
                                    <router-link
                                        :to="{ name: 'Network' }"
                                        class="nav-link dropdown-toggle"
                                        active-class="active"
                                    >
                                        Network
                                    </router-link>
                                    <div
                                        class="dropdown-menu dropdown-menu-right"
                                    >
                                        <router-link
                                            :to="{ name: 'Contacts' }"
                                            class="dropdown-item"
                                            active-class="active"
                                        >
                                            Contacts
                                        </router-link>
                                        <router-link
                                            :to="{ name: 'Community' }"
                                            class="dropdown-item"
                                            active-class="active"
                                        >
                                            Community
                                        </router-link>
                                        <router-link
                                            :to="{ name: 'Events' }"
                                            class="dropdown-item"
                                            active-class="active"
                                        >
                                            Events
                                        </router-link>
                                        <div class="dropdown-divider" />
                                        <router-link
                                            :to="{ name: 'Create' }"
                                            class="dropdown-item"
                                            active-class="active"
                                        >
                                            Create
                                        </router-link>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <router-link
                                        :to="{ name: 'Apply' }"
                                        class="nav-link"
                                        active-class="active"
                                    >
                                        Apply
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link
                                        :to="{ name: 'Learn' }"
                                        class="nav-link"
                                        active-class="active"
                                    >
                                        Learn
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link
                                        :to="{ name: 'Message' }"
                                        class="nav-link"
                                        active-class="active"
                                    >
                                        Message
                                    </router-link>
                                </li>
                                <li class="nav-item" v-if="admin">
                                    <router-link
                                        :to="{ name: 'Admin' }"
                                        class="nav-link"
                                        active-class="active"
                                    >
                                        Admin
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link
                                        :to="{ name: 'Logout' }"
                                        class="nav-link"
                                        active-class="active"
                                    >
                                        Logout
                                    </router-link>
                                </li>
                            </template>

                            <template v-else>
                                <li class="nav-item">
                                    <router-link
                                        :to="{ name: 'Login' }"
                                        class="nav-link"
                                        active-class="active"
                                    >
                                        Login
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link
                                        :to="{ name: 'Register' }"
                                        class="nav-link"
                                        active-class="active"
                                    >
                                        Register
                                    </router-link>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "./../store/types";

export default {
    name: "Header",

    computed: {
        ...mapGetters({
            authenticated: types.GET_AUTH,
            user: types.GET_USER_DETAILS
        }),
        admin() {
            return this.user.level > 3 ? true : false;
        },
        logo() {
            return require("./../assets/logo.png");
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="css" scoped>
.navigation {
    background: #ebebeb;
}
.logo {
    max-height: 60px;
}
.align-bottom {
    align-self: flex-end;
}
</style>

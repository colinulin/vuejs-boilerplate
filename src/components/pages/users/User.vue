<template>
    <div>
        <h1>{{ user.name }}</h1>
        <hr class="mb-4">
        <router-view :user="user" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as types from "../../../store/types";

export default {
    name: "User",

    computed: {
        ...mapGetters({
            user: types.GET_USER_DETAILS
        })
    },
    data() {
        return {};
    }
};
</script>

<style lang="css" scoped></style>

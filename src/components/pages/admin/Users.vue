<template>
    <div>
        <b-button-group class="mb-2">
            <b-button variant="link" :to="{ name: 'AdminUserCreate' }"
                >New User</b-button
            >
        </b-button-group>
        <b-list-group>
            <b-list-group-item
                v-for="user in allUsers"
                :key="user._id"
                :to="{
                    name: 'AdminUserEdit',
                    params: { userId: user._id }
                }"
            >
                <b-row>
                    <b-col sm="4">{{ user.name }}</b-col>
                    <b-col sm="6">{{ user.email }}</b-col>
                    <b-col sm="2">{{ levelToText(user.level) }}</b-col>
                </b-row>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "./../../../store/types";

export default {
    name: "Users",

    computed: {
        ...mapGetters({
            allUsers: types.GET_USERS
        })
    },
    methods: {
        levelToText(level) {
            switch (level) {
                case 1:
                    return "User";
                    break;
                case 10:
                    return "Editor";
                    break;
                case 100:
                    return "Admin";
                    break;
                default:
                    return "User";
                    break;
            }
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="css" scoped></style>

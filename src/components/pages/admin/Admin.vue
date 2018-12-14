<template>
    <div>
        <h1>Admin Portal</h1>
        <b-container class="mt-3">
            <b-row>
                <b-col sm="3" class="pl-0">
                    <b-card no-body>
                        <b-list-group flush>
                            <b-list-group-item
                                :to="{ name: 'AdminLearn' }"
                                class="list-group-item"
                                active-class="active"
                                tag="li"
                            >
                                Learn
                            </b-list-group-item>
                            <b-list-group-item
                                :to="{ name: 'AdminMessages' }"
                                class="list-group-item"
                                active-class="active"
                                tag="li"
                            >
                                Messages
                            </b-list-group-item>
                            <b-list-group-item
                                :to="{ name: 'AdminUsers' }"
                                class="list-group-item"
                                active-class="active"
                                tag="li"
                            >
                                Users
                            </b-list-group-item>
                        </b-list-group>
                    </b-card>
                </b-col>
                <b-col sm="9">
                    <router-view />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    name: "Admin",

    data() {
        return {};
    }
};
</script>

<style lang="css" scoped>
    .active a {
        color: #fff;
    }
</style>

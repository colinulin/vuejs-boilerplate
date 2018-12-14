<template>
    <b-container>
        <b-row class="justify-content-center">
            <b-card style="width: 32rem;">
                <h5 class="card-title">Login</h5>
                <b-alert variant="danger" :show="showErrorAlert">{{
                    errorMessage
                }}</b-alert>
                <b-form @submit.prevent="submitLogin">
                    <fieldset :disabled="submitted">
                        <b-form-group label="Email Address" label-for="email">
                            <b-form-input
                                id="email"
                                type="text"
                                v-model="email"
                                required
                                placeholder="Enter email"
                            >
                            </b-form-input>
                        </b-form-group>
                        <b-form-group label="Password" label-for="password">
                            <b-form-input
                                id="password"
                                v-model="password"
                                type="password"
                                placeholder="Enter password again"
                                required
                            >
                            </b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="primary"
                            >Submit</b-button
                        >
                    </fieldset>
                </b-form>
            </b-card>
        </b-row>
    </b-container>
</template>

<script>
import { mapActions } from "vuex";
import * as types from "../../store/types";

export default {
    name: "Login",

    methods: {
        ...mapActions({
            login: types.LOG_IN
        }),
        submitLogin() {
            this.submitted = true;
            this.showErrorAlert = false;
            this.login({
                email: this.email,
                password: this.password
            }).then(res => {
                if (!res.success) {
                    this.errorMessage = res.error;
                    this.showErrorAlert = true;
                }
                this.submitted = false;
            });
        }
    },
    data() {
        return {
            email: "",
            password: "",
            submitted: false,
            errorMessage: false,
            showErrorAlert: false
        };
    }
};
</script>

<style lang="css" scoped></style>

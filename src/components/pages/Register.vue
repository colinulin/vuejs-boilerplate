<template>
    <b-container>
        <b-row class="justify-content-center">
            <b-card style="width: 32rem;">
                <h5 class="card-title">Register</h5>
                <b-alert variant="danger" :show="showErrorAlert">{{
                    errorMessage
                }}</b-alert>
                <b-form @submit.prevent="submitRegister">
                    <fieldset :disabled="submitted">
                        <b-form-group label="Full Name" label-for="name">
                            <b-form-input
                                id="name"
                                type="text"
                                v-model="name"
                                required
                                placeholder="Enter full name"
                            >
                            </b-form-input>
                        </b-form-group>
                        <b-form-group
                            label="Email Address"
                            label-for="email"
                            description="We'll never share your email with anyone else."
                        >
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
                                type="password"
                                v-model="password"
                                class="mb-2"
                                placeholder="Enter password"
                                required
                            >
                            </b-form-input>
                            <b-form-input
                                id="password2"
                                v-model="password2"
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
    name: "Register",

    methods: {
        ...mapActions({
            register: types.REGISTER
        }),
        submitRegister() {
            this.submitted = true;
            this.showErrorAlert = false;
            if (this.password !== this.password2) {
                this.showErrorAlert = true;
                this.submitted = false;
                this.errorMessage = "Passwords do not match.";
            } else if (this.name === "") {
                this.showErrorAlert = true;
                this.submitted = false;
                this.errorMessage = "You must enter a name.";
            } else if (this.email === "") {
                this.showErrorAlert = true;
                this.submitted = false;
                this.errorMessage = "You must enter an email address.";
            } else {
                this.register({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password2: this.password2
                }).then(res => {
                    if (!res.success) {
                        this.errorMessage = res.error;
                        this.showErrorAlert = true;
                    }
                    this.submitted = false;
                });
            }
        }
    },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            password2: "",
            submitted: false,
            showErrorAlert: false,
            errorMessage: "Error updating profile. Please try again later."
        };
    }
};
</script>

<style lang="css" scoped></style>

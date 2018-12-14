<template>
    <b-container>
        <h2 v-if="form._id">Update User</h2>
        <h2 v-else>Create User</h2>
        <b-alert variant="success" :show="showSuccessAlert"
            >User successfully updated!</b-alert
        >
        <b-alert variant="danger" :show="showErrorAlert">{{
            errorMessage
        }}</b-alert>
        <b-form @submit.prevent="submitForm('AdminUsers')">
            <fieldset :disabled="submitted">
                <b-form-group label="Full Name" label-for="name">
                    <b-form-input
                        id="name"
                        type="text"
                        v-model="form.name"
                        required
                        placeholder="Enter full name"
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    label="Email"
                    label-for="email"
                >
                    <b-form-input
                        id="emailfield"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter email"
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group label="Level" label-for="level">
                    <b-form-select
                        v-model="form.level"
                        id="communication"
                        :options="levels"
                    >
                    </b-form-select>
                </b-form-group>
                <b-form-group label="Change Password" label-for="password" description="Leave this field blank if you do not want to change the user's password.">
                    <b-form-input
                        id="passwordfield"
                        type="password"
                        v-model="form.password"
                        class="mb-2"
                    >
                    </b-form-input>
                    <b-form-input
                        id="password2field"
                        v-model="form.password2"
                        type="password"
                    >
                    </b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary" v-if="form._id">Update</b-button>
                <b-button type="submit" variant="primary" v-else>Create</b-button>
            </fieldset>
            <input
                v-if="form._id"
                type="hidden"
                name="userId"
                v-model="form._id"
            />
        </b-form>
    </b-container>
</template>

<script>
import _find from "lodash/find";
import { mapActions, mapGetters } from "vuex";
import * as types from "../../../store/types";

export default {
    name: "LearnForm",

    created() {
        this.populateForm(this.$route.params.userId ? true : false);
    },
    methods: {
        ...mapActions({
            updateUser: types.UPDATE_USER,
            createUser: types.CREATE_USER
        }),
        submitForm(next) {
            this.submitted = true;
            this.showErrorAlert = false;
            this.showSuccessAlert = false;
            if (this.form.name === "" || this.form.email === "") {
                this.errorMessage =
                    "The name and email fields are required.";
                this.showErrorAlert = true;
                this.submitted = false;
                return;
            }
            if (this.$route.params.userId) {
                this.updateUser(this.form).then(res => {
                    if (res.success) {
                        this.form.password = "";
                        this.form.password2 = "";
                        this.showSuccessAlert = true;
                        this.successMessage = "User updated!";
                    }
                    this.submitted = false;
                });
            } else {
                this.createUser(this.form).then(res => {
                    if (res.success) {
                        this.$router.push({ name: next });
                    }

                    this.submitted = false;
                });
            }
        },
        populateForm() {
            if (this.$route.params.userId) {
                return _find(this.getUsers, {
                    _id: this.$route.params.userId
                });
            } else {
                return {
                    name: "",
                    email: "",
                    level: 1,
                    password: "",
                    password2: ""
                };
            }
        }
    },
    computed: {
        ...mapGetters({
            getUsers: types.GET_USERS
        }),
        form() {
            return this.populateForm(this.$route.params.userId, this.reset);
        }
    },
    data() {
        return {
            submitted: false,
            showSuccessAlert: false,
            showErrorAlert: false,
            errorMessage: "Error updating profile. Please try again later.",
            levels: [
                { value: "1", text: "User" },
                { value: "10", text: "Editor" },
                { value: "100", text: "Admin" },
            ]
        };
    }
};
</script>

<style lang="css" scoped></style>

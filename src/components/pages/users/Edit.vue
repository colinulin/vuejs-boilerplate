<template>
    <b-container>
        <b-row>
            <b-col sm="3">
                <img
                    :src="image?image:defaultImage"
                    alt="Default Logo"
                    class="avatar img-thumbnail rounded-circle"
                />
                <h6 class="mt-2" v-if="uploading">Uploading! Please wait.</h6>
                <h6 class="mt-2" v-else>Upload a different photo...</h6>
                <fieldset :disabled="submitted">
                    <input
                        type="file"
                        class="text-center center-block file-upload"
                        @change="onFileChange"
                    />
                </fieldset>
            </b-col>
            <b-col sm="6">
                <b-alert variant="success" :show="showSuccessAlert"
                    >Profile successfully updated!</b-alert
                >
                <b-alert variant="danger" :show="showErrorAlert">{{
                    errorMessage
                }}</b-alert>
                <b-form @submit.prevent="submitEdit">
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
                            description="We'll never share your email with anyone else."
                        >
                            <b-form-input
                                id="email"
                                type="email"
                                v-model="form.email"
                                required
                                placeholder="Enter email"
                            >
                            </b-form-input>
                        </b-form-group>
                        <b-form-group
                            label="Change Password"
                            label-for="password"
                        >
                            <b-form-input
                                id="password"
                                type="password"
                                v-model="form.password"
                                class="mb-2"
                            >
                            </b-form-input>
                            <b-form-input
                                id="password2"
                                v-model="form.password2"
                                type="password"
                            >
                            </b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="primary"
                            >Submit</b-button
                        >
                    </fieldset>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapActions } from "vuex";
import * as types from "../../../store/types";

export default {
    name: "Edit",

    props: {
        user: {
            type: Object
        }
    },
    computed: {
        defaultImage() {
            return require("./../../../assets/avatar_2x.png");
        }
    },
    methods: {
        ...mapActions({
            updateUser: types.UPDATE_USER_DETAILS,
            updateProfilePicture: types.UPDATE_PROFILE_PICTURE
        }),
        onFileChange(e) {
            this.submitted = true;
            this.uploading = true;

            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            const file = files[0];
            let formData = new FormData();
            formData.append('file', file);
            if ( file.size > 3000000 ) {
                this.showErrorAlert = true;
                this.errorMessage = "Profile pictures must be under 3MB.";
            } else {
                this.updateProfilePicture(formData).then(res => {
                    this.uploading = false;
                    this.submitted = false;

                    if ( res.success ) {
                        this.image = `https://assets.aspirecareerfoundations.com/${res.data}`;
                    } else {
                        this.showErrorAlert = true;
                        this.errorMessage = res.error;
                    }
                });
            }
        },
        submitEdit() {
            this.submitted = true;
            this.showSuccessAlert = false;
            this.showErrorAlert = false;
            this.updateUser(this.form).then(res => {
                if (res.success) {
                    this.showSuccessAlert = true;
                } else {
                    this.showErrorAlert = true;
                    this.errorMessage = res.error;
                }
                this.form.password = "";
                this.form.password2 = "";
                this.submitted = false;
            });
        }
    },
    data() {
        return {
            form: {
                email: this.user.email,
                name: this.user.name,
                password: "",
                password2: ""
            },
            image: `https://assets.aspirecareerfoundations.com/${this.user.image}`,
            submitted: false,
            showSuccessAlert: false,
            showErrorAlert: false,
            uploading: false,
            errorMessage: "Error updating profile. Please try again later."
        };
    }
};
</script>

<style lang="css" scoped>
    .avatar {
        width: 250px;
        height: 250px;
    }
    .file-upload {
        max-width: 245px;
    }
</style>

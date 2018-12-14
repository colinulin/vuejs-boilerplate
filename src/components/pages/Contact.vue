<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="card" style="width: 32rem;">
                <div class="card-body">
                    <h5 class="card-title">Contact Us</h5>
                    <p>
                        Have a question about the platform? Noticed an issue?
                        Have a recommendation to help us improve? Let's talk!
                    </p>
                    <form>
                        <fieldset :disabled="submitted">
                            <div class="form-group">
                                <label for="InputTopic">Topic*</label>
                                <select class="custom-select">
                                    <option selected
                                        >-- Select a topic --</option
                                    >
                                    <option value="1">General Question</option>
                                    <option value="2">Bug Report</option>
                                    <option value="3"
                                        >Feature Suggestion</option
                                    >
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="InputMessage">Message*</label>
                                <textarea
                                    class="form-control"
                                    rows="5"
                                    id="message"
                                />
                            </div>
                            <button
                                type="submit"
                                class="btn btn-primary"
                                @click.prevent="submitForm();"
                            >
                                Submit
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Contact",

    methods: {
        submitForm() {
            this.submitted = true;
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="css" scoped></style>

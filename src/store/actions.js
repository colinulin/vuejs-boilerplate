import * as types from "./types";
import router from "./../router/";

import user from "./modules/user";

import axios from "axios";

export default {
    ...user.actions
};

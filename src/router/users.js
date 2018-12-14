import * as types from "./../store/types";
import { store } from "./../store/store";

import User from "./../components/pages/users/User";
import Edit from "./../components/pages/users/Edit";
import Profile from "./../components/pages/users/Profile";

export default {
    path: "/users",
    name: "User",
    component: User,
    beforeEnter: (to, from, next) => {
        if (store.getters[types.GET_AUTH]) {
            next();
        } else {
            next({ name: "Login" });
        }
    },
    children: [
        {
            path: ":userId/edit",
            name: "UserEdit",
            component: Edit,
            meta: {
                title: "Edit Profile"
            }
        },
        {
            path: ":userId",
            name: "UserProfile",
            component: Profile,
            meta: {
                title: "User Profile"
            }
        }
    ],
    meta: {
        title: "Users"
    }
};

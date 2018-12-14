import * as types from "./../store/types";
import { store } from "./../store/store";

const Admin = resolve => {
    require.ensure(['./../components/pages/admin/Admin'], () => {
        resolve(require('./../components/pages/admin/Admin'));
    });
};
const Users = resolve => {
    require.ensure(['./../components/pages/admin/Users'], () => {
        resolve(require('./../components/pages/admin/Users'));
    });
};
const UserForm = resolve => {
    require.ensure(['./../components/pages/admin/UserForm'], () => {
        resolve(require('./../components/pages/admin/UserForm'));
    });
};

export default {
    path: "/admin",
    name: "Admin",
    component: Admin,
    beforeEnter: (to, from, next) => {
        if (store.getters[types.GET_AUTH]) {
            if (store.getters[types.GET_USER_DETAILS].level > 3) {
                next();
            } else {
                next({ name: "Logout" });
            }
        } else {
            next({ name: "Logout" });
        }
    },
    children: [
        {
            path: "users/create",
            name: "AdminUserCreate",
            component: UserForm
        },
        {
            path: "users/:userId/edit",
            name: "AdminUserEdit",
            component: UserForm
        },
        {
            name: "AdminUsers",
            path: "users",
            component: Users,
            beforeEnter: (to, from, next) => {
                store.dispatch(types.LOAD_USERS);
                next();
            }
        }
    ],
    meta: {
        title: "Admin"
    }
};

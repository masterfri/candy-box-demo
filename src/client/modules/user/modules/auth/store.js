import LoginRequest from 'candy-box-demo/modules/user/modules/auth/requests/login.js';
import { isNil } from 'candy-box/helpers.js';
import { transport } from 'candy-box/transport/base.js';
import User from 'candy-box-demo/modules/user/documents/user.js';

export default {
    namespaced: true,
    state: () => ({
        user: null,
        token: null,
    }),
    mutations: {
        login(state, {user, token}) {
            state.user = user;
            state.token = token;
            transport().stickHeader('authorization', token);
        },
        logout(state) {
            state.user = null;
            state.token = null;
        },
    },
    actions: {
        login({commit}, {login, password}) {
            let request = new LoginRequest({login, password});
            return request.send().then((response) => {
                let authHeader = response.getHeader('authorization');
                if (isNil(authHeader)) {
                    throw new Error('Authorization header is not set');
                }
                localStorage.setItem('userData', JSON.stringify(response.body));
                localStorage.setItem('userToken', authHeader);
                commit('login', {
                    user: new User(response.body),
                    token: authHeader,
                });
            });
        },
        logout({commit}) {
            localStorage.removeItem('userData');
            localStorage.removeItem('userToken');
            commit('logout');
        },
        autologin({commit}) {
            let data = localStorage.getItem('userData');
            let token = localStorage.getItem('userToken');
            if (!isNil(data) && !isNil(token)) {
                commit('login', {
                    user: new User(JSON.parse(data)),
                    token,
                });
                return true;
            }
            return false;
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        isLoggedIn(state) {
            return state.user !== null;
        },
        userId(state) {
            return state.user !== null ? state.user.id : null;
        },
        userName(state) {
            return state.user !== null ? state.user.name : null;
        },
        isAdmin(state) {
            return state.user !== null && state.user.role === 'admin';
        },
        isManager(state) {
            return state.user !== null && state.user.role === 'manager';
        },
        isDelivery(state) {
            return state.user !== null && state.user.role === 'delivery';
        },
        isCustomer(state) {
            return state.user !== null && state.user.role === 'customer';
        },
    },
}

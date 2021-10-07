import { createApp } from 'vue';
import { createStore } from 'vuex';
import { createRouter,
    createWebHashHistory } from 'vue-router';
import { is } from 'candy-box/helpers.js';
import App from 'candy-box/app.js';
import Validator, {
    ValidatorSymbol } from 'candy-box/validation/validator.js'; 
import { TransportSymbol } from 'candy-box/transport/base.js';
import HttpTransport from 'candy-box/transport/http.js';
import Response from 'candy-box/transport/response.js';
import config from './config.js';
import 'candy-box-demo/client/modules/user/boot.js';
import 'candy-box-demo/client/modules/product/boot.js';
import root from 'candy-box-demo/client/components/root.vue';
import home from 'candy-box-demo/client/components/home.vue';
import page from 'candy-box-demo/client/components/page.vue';
import dataset from 'candy-box-demo/client/components/dataset.vue';
import permissions from 'candy-box-demo/client/mixins/permissions.js';

const app = createApp(root);

const store = createStore({
    state: () => ({
        errors: [],
        errorIndex: 0,
    }),
    mutations: {
        pushError(state, error) {
            state.errors.push({
                error,
                index: state.errorIndex,
            });
            state.errorIndex++;
        },
        shiftError(state) {
            state.errors.shift();
        },
    },
    actions: {
        catchError({commit}, error) {
            if (is(error, Response)) {
                commit('pushError', [
                    error.status,
                    error.message,
                ].join(' - '));
            } else if (is(error, Error)) {
                commit('pushError', error.message);
            } else {
                commit('pushError', 'Oops! Something goes wrong...');
            }
            setTimeout(() => {
                commit('shiftError');
            }, 5000);
        },
    },
    getters: {
        errors(state) {
            return state.errors;
        },
        hasErrors(state) {
            return state.errors.length !== 0;
        },
    },
    modules: [],
});

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            component: home,
            path: '/',
            name: 'home',
        },
    ],
});

App.configure(config);
App.expose('router', router);
App.expose('store', store);
App.expose('app', app);

App.register(({box, config, app}) => {
    box.factory(ValidatorSymbol, () => new Validator());
    box.singleton(TransportSymbol, () => new HttpTransport(config.transport));
    app.component('page', page);
    app.component('dataset', dataset);
    app.mixin(permissions);
});
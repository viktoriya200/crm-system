import {createStore, createLogger} from 'vuex'
import auth from './modules/auth'
import request from './modules/request'

const plugins = [];
if (process.env.NODE_ENV === 'development') {
    plugins.push(createLogger);
}

export default createStore({
    plugins,

    state() {
        return {
            message: null,
        }
    },

    getters: {
        getMessage(store) {
            return store.message;
        },
    },

    mutations: {
        setMessage(state, message) {
            state.message = message;
        },

        clearMessage(state) {
            state.message = null;
        },
    },

    actions: {
        setMessage({commit}, message) {
            commit('setMessage', message);

            setTimeout(() => {
                commit('clearMessage');
            }, 5000);
        },
    },

    modules: {
        auth,
        request,
    }
})

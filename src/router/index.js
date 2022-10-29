import {createRouter, createWebHistory} from 'vue-router'
import store from '../store';
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            layout: 'Main',
            auth: true,
        },
    },
    {
        path: '/help',
        name: 'Help',
        component: () => import('../views/Help.vue'),
        meta: {
            layout: 'Main',
            auth: true,
        },
    },
    {
        path: '/request/:id',
        name: 'Request',
        component: () => import('../views/Request.vue'),
        meta: {
            layout: 'Main',
            auth: true,
        },
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../views/Auth.vue'),
        meta: {
            layout: 'Auth',
            auth: false,
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
    const requireAuth = to.meta.auth;

    if (requireAuth && store.getters['auth/isAutorize']) {
        next();
    } else if (requireAuth && !store.getters['auth/isAutorize']) {
        next('/auth?message=auth');
    } else {
        next();
    }
});

export default router

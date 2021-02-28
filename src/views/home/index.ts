import { RouteRecordRaw } from 'vue-router';

import Home from './Home.vue';

export const HOME_ROUTE: RouteRecordRaw = {
    path: '/',
    name: 'home',
    component: Home,
};

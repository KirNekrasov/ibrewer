import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { HOME_ROUTE } from '../views/home';
import { CALCS_ROUTE } from '../views/calcs';

const routes: Array<RouteRecordRaw> = [HOME_ROUTE, CALCS_ROUTE];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;

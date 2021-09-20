import { RouteRecordRaw } from 'vue-router';

import Calcs from './Calcs.vue';

import { CIDER_ROUTE } from './Cider';
import { BEER_ROUTE } from './Beer';

export const CALCS_ROUTE: RouteRecordRaw = {
    path: '/calcs',
    name: 'calcs',
    component: Calcs,
    children: [CIDER_ROUTE, BEER_ROUTE],
};

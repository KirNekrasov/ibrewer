import { RouteRecordRaw } from 'vue-router';

import Beer from './Beer.vue';

import BeerExtract from './BeerExtract.vue';

export const BEER_ROUTE: RouteRecordRaw = {
    path: 'beer',
    name: 'beer',
    component: Beer,
    children: [
        {
            path: 'extract',
            name: 'beerExtract',
            component: BeerExtract,
        },
    ],
};

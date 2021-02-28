import { RouteRecordRaw } from 'vue-router';

import Cider from './Cider.vue';

import CiderRaw from './CiderRaw.vue';
import CiderTarget from './CiderTarget.vue';

export const CIDER_ROUTE: RouteRecordRaw = {
    path: 'cider',
    name: 'cider',
    component: Cider,
    children: [
        {
            path: 'raw',
            name: 'ciderRaw',
            component: CiderRaw,
        },
        {
            path: 'target',
            name: 'ciderTarget',
            component: CiderTarget,
        },
    ],
};

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../view/Landing.vue')
    },
    {
        path: '/questionnaire',
        component: () => import('../view/questionnaire/LookingForModel.vue')
    },

    {
        path: '/questionnaire/selectModel',
        component: () => import('../view/questionnaire/SelectModel.vue')
    },
    {
        path: '/questionnaire/selectMobileCarrier',
        component: () => import('../view/questionnaire/SelectMobileCarrier.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
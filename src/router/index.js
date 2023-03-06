import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../view/Landing.vue')
    },

    //questionnaire
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
    {
        path: '/questionnaire/selectUsagePeriod',
        component: () => import('../view/questionnaire/SelectUsagePeriod.vue')
    },
    {
        path: '/questionnaire/selectBillPaid',
        component: () => import('../view/questionnaire/SelectBillPaid.vue')
    },
    {
        path: '/questionnaire/selectLocation',
        component: () => import('../view/questionnaire/SelectLocation.vue')
    },

    //questionnaire complete
    {
        path: '/questionnaireCompleted/loading',
        component: () => import('../view/questionnaireCompleted/Loading.vue')
    },
    {
        path: '/questionnaireCompleted/Found',
        component: () => import('../view/questionnaireCompleted/Found.vue')
    },
    {
        path: '/questionnaireCompleted/NotFound',
        component: () => import('../view/questionnaireCompleted/NotFound.vue')
    },

    //estimate comparison
    {
        path: '/estimateComparison/billPaidEstimateCard',
        component: () => import('../view/estimateComparison/BillPaidEstimateCard.vue')
    },
    {
        path: '/estimateComparison/modelEstimateCard',
        component: () => import('../view/estimateComparison/ModelEstimateCard.vue')
    },
    {
        path: '/estimateComparison/cardDetail',
        component: () => import('../view/estimateComparison/CardDetail.vue')
    },

    //confirm estimate
    {
        path: '/confirm/confirmEstimate',
        component: () => import('../view/confirm/ConfirmEstimate.vue')
    },
    {
        path: '/confirm/confirmCheck',
        component: () => import('../view/confirm/ConfirmCheck.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
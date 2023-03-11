import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../view/Landing.vue')
    },
    {
        path: '/login',
        component: () => import('../view/KakaoLogin.vue')
    },
    {
        path: '/kakao/auto',
        component: () => import('../view/KakaoAuth.vue')
    },

    //questionnaire
    {
        path: '/questionnaire',
        alias: ['/questionnaire/:findType'],
        component: () => import('../view/questionnaire/LookingForModel.vue')
    },
    {
        path: '/questionnaire/:findType/selectModel',
        alias: ['/questionnaire/:findType/:deviceIdx'],
        component: () => import('../view/questionnaire/SelectModel.vue')
    },
    {
        path: '/questionnaire/:findType/:deviceIdx/selectMobileCarrier',
        alias: ['/questionnaire/:findType/:deviceIdx/:useTelecomIdx/'],
        component: () => import('../view/questionnaire/SelectMobileCarrier.vue')
    },
    {
        path: '/questionnaire/:findType/:deviceIdx/:useTelecomIdx/selectUsagePeriod',
        alias: ['/questionnaire/:findType/:deviceIdx/:useTelecomIdx/:usePeriodIdx'],
        component: () => import('../view/questionnaire/SelectUsagePeriod.vue')
    },
    {
        path: '/questionnaire/:findType/:deviceIdx/:useTelecomIdx/:usePeriodIdx/selectBillPaid',
        alias: ['/questionnaire/:findType/:deviceIdx/:useTelecomIdx/:usePeriodIdx/:monthCost'],
        component: () => import('../view/questionnaire/SelectBillPaid.vue')
    },
    {
        path: '/questionnaire/:findType/:deviceIdx/:useTelecomIdx/:usePeriodIdx/:monthCost/selectLocation',
        component: () => import('../view/questionnaire/SelectLocation.vue')
    },

    //questionnaire complete
    {
        path: '/questionnaireCompleted/loading',
        props: true,
        component: () => import('../view/questionnaireCompleted/Loading.vue')
    },
    {
        path: '/questionnaireCompleted/Found',
        component: () => import('../view/questionnaireCompleted/Found.vue')
    },
    {
        path: '/questionnaireCompleted/NotFound',
        props: true,
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
    routes,
    scrollBehavior(){
        return { top: 0 }
      },
})

export default router
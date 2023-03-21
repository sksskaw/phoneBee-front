<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <Vue3Lottie class="loading-img" :animationData="loadingImg" />

        <div class="loading-page-box-1 animate__animated animate__fadeInUp">
            {{ sigungu }} 주변 매장들의<br>
            {{ condition }} 견적을<br>
            확인하고 있어요.
        </div>

        <div class="loading-page-box-2 animate__animated animate__fadeInUp">
            견적을 비교하여<br>
            최적의 선택지를 알려드릴게요!
        </div>
    </div>
</template>

<script>
import apiEstimate from '@/api/estimate';
import cookie from '@/utils/cookie';
import apiQuestionnaire from '@/api/questionnaire';

import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import loadingImg from '@/assets/loading.json'

export default {
    components: {
        Vue3Lottie
    },

    data() {
        return {
            sigungu: '',
            condition: '',
            loadingImg,
            surveyCode: null,
        }
    },

    mounted() {
        const surveyParmas = JSON.parse(localStorage.getItem('surveyParmas'))
        this.postSurvey(surveyParmas)
    },

    methods: {
        onBackBtn() {
            this.$router.push("/");
        },

        postSurvey(params) {
            var findType = params.findType

            // 원하는 기기 있는 경우
            if (findType == "1") {
                apiQuestionnaire.postSurveyDeviceComplete(params)
                    .then(response => {
                        if (response.data.resultCode === 0) {
                            this.surveyCode = response.data.surveyCode
                            var enmemberidx = response.data.Enmemberidx
                            cookie.setCookie('Enmemberidx', enmemberidx, 1)
                            this.getEstimateCheck(enmemberidx)
                        } else {
                            console.log("실패")
                        }
                    }).catch(e => {
                        // 예외사항 체크
                        console.log(e)
                    });
            }

            // 원하는 기기 없는 경우
            if (findType == "0") {
                apiQuestionnaire.postSurveyCostComplete(params)
                    .then(response => {
                        if (response.data.resultCode === 0) {
                            this.surveyCode = response.data.surveyCode
                            var enmemberidx = response.data.Enmemberidx
                            cookie.setCookie('Enmemberidx', enmemberidx, 1)
                            this.getEstimateCheck(enmemberidx)
                        } else {
                            console.log("실패")
                        }
                    }).catch(e => {
                        // 예외사항 체크
                        console.log(e)
                    });
            }
        },

        getEstimateCheck(enmemberidx) {
            apiEstimate.getEstimateCheck(this.surveyCode, enmemberidx)
                .then(response => {
                    this.condition = response.data.buttonLabel.condition
                    this.sigungu = response.data.buttonLabel.findArea

                    if (response.data.isEstimate == 'N') {
                        localStorage.setItem('searchAgain', JSON.stringify(response.data.searchAgain))
                        this.$router.push(`/questionnaireCompleted/NotFound?sigungu=${this.sigungu}`);
                    }

                    if (response.data.isEstimate == 'Y') {
                        if (response.data.findType == 'device') {
                            this.$router.push(`/estimateComparison/modelEstimateCard?surveyCode=${this.surveyCode}`);
                        }

                        if (response.data.findType == 'cost') {
                            this.$router.push(`/estimateComparison/billPaidEstimateCard?surveyCode=${this.surveyCode}`);
                        }
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        },
    }
}
</script>

<style scoped>
.back-btn-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 60px;

    margin-bottom: 56px;
}

.back-btn {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.loading-img {
    height: 187px;
    margin-bottom: 56px;
}

.loading-page-box-1 {
    height: 66px;


    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;

    color: #391A15;

    margin-bottom: 48px;
}

.loading-page-box-2 {
    height: 60px;


    font-style: normal;
    font-weight: 700;
    font-size: 21.33px;
    line-height: 30px;
    text-align: center;

    color: #391A15;

    animation-delay: 1s;
}
</style>
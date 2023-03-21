<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <img class="not-found-img" src="/images/not_found.png">

        <div class="not-found-page-box-1">
            입력해주신 {{ sigungu }}<br>
            주변에는 저렴한 견적이 없어요.
        </div>

        <div class="not-found-page-box-2">
            지금 현재 {{ searchAgain }} 에서는 추천이 가능해요.<br>
            {{ searchAgain }}의 견적을 확인해 보시겠어요?
        </div>

        <div v-if="loading == false" class="reTrySurvey-btn" @click="onReTrySurvey">최적 견적 확인하기</div>
        <div v-if="loading == true" class="reTrySurvey-btn">
            <Vue3Lottie :animationData="loadingImg" />
        </div>
    </div>
</template>

<script>
import apiQuestionnaire from '@/api/questionnaire';
import cookie from '@/utils/cookie';

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
            searchAgain: '',
            reTrySurvey: {},

            loading: false,
            loadingImg,
        }
    },

    mounted() {
        var enmemberidx = cookie.getCookie('Enmemberidx')
        if (enmemberidx == '' || enmemberidx == null) {
            const urlParams = new URL(location.href).searchParams;
            enmemberidx = urlParams.get('Enmemberidx');
            cookie.setCookie('Enmemberidx', enmemberidx, 1)
        }

        if (enmemberidx == '' || enmemberidx == null) {
            this.$router.push("/");
        }

        const searchAgain = JSON.parse(localStorage.getItem('searchAgain'))
        this.sigungu = this.$route.query.sigungu
        this.searchAgain = searchAgain.reTrySurvey.findArea
        this.reTrySurvey = searchAgain.reTrySurvey
    },

    methods: {
        onBackBtn() {
            this.$router.go(-2);
        },

        onReTrySurvey() {
            this.loading = true

            var enmemberidx = cookie.getCookie('Enmemberidx')
            let findArea = this.reTrySurvey.findArea
            let param = {
                useTelecomIdx: parseInt(this.reTrySurvey.useTelecomIdx),
                usePeriodIdx: parseInt(this.reTrySurvey.usePeriodIdx),
                deviceIdx: parseInt(this.reTrySurvey.deviceIdx),
                monthCost: parseInt(this.reTrySurvey.monthCost),
                findArea: encodeURIComponent(findArea),
            }

            var findType = this.reTrySurvey.findType
            // 원하는 기기 있는 경우
            if (findType == "device") {
                apiQuestionnaire.postSurveyDeviceComplete(param, enmemberidx)
                    .then(response => {
                        if (response.data.resultCode === 0) {
                            this.$router.push(`/questionnaireCompleted/loading?surveyCode=${response.data.surveyCode}`);
                        } else {
                            console.log("실패")
                        }
                    }).catch(e => {
                        // 예외사항 체크
                        console.log(e)
                    });
            }

            // 원하는 기기 없는 경우
            if (findType == "cost") {
                apiQuestionnaire.postSurveyCostComplete(param, enmemberidx)
                    .then(response => {
                        if (response.data.resultCode === 0) {
                            this.$router.push(`/questionnaireCompleted/loading?surveyCode=${response.data.surveyCode}`);
                        } else {
                            console.log("실패")
                        }
                    }).catch(e => {
                        // 예외사항 체크
                        console.log(e)
                    });
            }
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

    margin-bottom: 72px;
}

.back-btn {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.not-found-img {
    display: block;
    margin: 0px auto;
    width: 218px;
    height: 218px;

    margin-bottom: 96px;
}

.not-found-page-box-1 {
    height: 60px;


    font-style: normal;
    font-weight: 700;
    font-size: 21.33px;
    line-height: 30px;
    text-align: center;

    color: #391A15;

    margin-bottom: 28px;
}

.not-found-page-box-2 {
    height: 44px;


    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;

    color: #391A15;

    margin-bottom: 118px;
}

.reTrySurvey-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px 24px 46px 24px;
    gap: 10px;
    height: 58px;

    background: #391A15;
    border-radius: 8px;


    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: #FFFFFF;
}
</style>
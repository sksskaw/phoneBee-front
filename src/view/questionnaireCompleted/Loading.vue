<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <img class="loading-img" src="/images/loading.gif">

        <div class="loading-page-box-1 animate__animated animate__fadeInUp">
            {{ sigungu }} 주변 매장들의<br>
            {{ estimateText }} 견적을<br>
            확인하고 있어요.
        </div>

        <div class="loading-page-box-2 animate__animated animate__fadeInUp">
            견적을 비교하여<br>
            최적의 선택지를 알려드릴게요!
        </div>
    </div>
</template>

<script>
import apiQuestionnaire from '@/api/questionnaire';
import cookie from '@/utils/cookie';

export default {
    data() {
        return {
            sigungu: localStorage.getItem('sigungu'),
            estimateText: null,
        }
    },

    created() {
        this.setEstimateBtnText()
    },

    mounted() {
        var enmemberidx = cookie.getCookie('Enmemberidx')
        if (enmemberidx == '' || enmemberidx == null)
            this.$router.push("/");

        var lookingForModelCheck = localStorage.getItem('lookingForModelCheck')

        var selectedModel = JSON.parse(localStorage.getItem('selectedModel'))
        var selectedMobileCarrier = JSON.parse(localStorage.getItem('selectedMobileCarrier'))
        var selectedUsagePeriod = JSON.parse(localStorage.getItem('selectedUsagePeriod'))
        var selectBillPaid = JSON.parse(localStorage.getItem('selectBillPaid'))

        var sido = localStorage.getItem('sido')
        var sigungu = localStorage.getItem('sigungu')

        // 원하는 기기 있는 경우
        if (lookingForModelCheck == "1") {
            let param = {
                useTelecomIdx: parseInt(selectedMobileCarrier.value),
                usePeriodIdx: parseInt(selectedUsagePeriod.value),
                deviceIdx: parseInt(selectedModel.value),
                findArea: encodeURIComponent(sido + " " + sigungu),
            }
            console.log(param)
            this.postSurveyDeviceComplete(param, enmemberidx)
        }

        // 원하는 기기 없는 경우
        if (lookingForModelCheck == "0") {
            let param = {
                useTelecomIdx: parseInt(selectedMobileCarrier.value),
                usePeriodIdx: parseInt(selectedUsagePeriod.value),
                monthCost: parseInt(selectBillPaid.value),
                findArea: encodeURIComponent(sido + " " + sigungu),
            }
            console.log(param)
            this.postSurveyCostComplete(param, enmemberidx)

        }
    },

    methods: {
        onBackBtn() {
            this.$router.push("/questionnaire/selectLocation");
        },

        setEstimateBtnText() {
            var lookingForModelCheck = localStorage.getItem('lookingForModelCheck')
            var selectedModel = JSON.parse(localStorage.getItem('selectedModel'))
            var selectBillPaid = JSON.parse(localStorage.getItem('selectBillPaid'))

            if (lookingForModelCheck == "0") {
                this.estimateText = selectBillPaid.name
            }

            if (lookingForModelCheck == "1") {
                this.estimateText = selectedModel.name
            }
        },

        postSurveyDeviceComplete(param, enmemberidx) {
            apiQuestionnaire.postSurveyDeviceComplete(param, enmemberidx)
                .then(response => {
                    console.log(response)
                    //this.$router.push("/questionnaireCompleted/loading");
                })
                .catch(e => {
                    console.log(e)
                });
        },

        postSurveyCostComplete(param, enmemberidx) {
            apiQuestionnaire.postSurveyCostComplete(param, enmemberidx)
                .then(response => {
                    console.log(response)
                    //this.$router.push("/questionnaireCompleted/loading");
                })
                .catch(e => {
                    console.log(e)
                });
        }
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

    font-family: 'Pretendard';
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

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 21.33px;
    line-height: 30px;
    text-align: center;

    color: #391A15;

    animation-delay: 1s;
}
</style>
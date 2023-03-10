<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <img class="loading-img" src="/images/loading.gif">

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

export default {
    data() {
        return {
            sigungu: '',
            condition: '',
        }
    },


    mounted() {
        var enmemberidx = cookie.getCookie('Enmemberidx')
        if (enmemberidx == '' || enmemberidx == null)
            this.$router.push("/");

        this.getEstimateCheck(enmemberidx)
    },

    methods: {
        onBackBtn() {
            this.$router.push("/");
        },

        getEstimateCheck(enmemberidx) {
            apiEstimate.getEstimateCheck(this.$route.query.surveyCode, enmemberidx)
                .then(response => {
                    this.condition = response.data.buttonLabel.condition
                    this.sigungu = response.data.buttonLabel.findArea
                    let searchAgain = response.data.searchAgain.findArea

                    setTimeout(() => {
                        if (response.data.isEstimate == 'N') {
                            this.$router.push(`/questionnaireCompleted/NotFound?findArea=${this.sigungu}&searchAgain=${searchAgain}`);
                        }

                        if (response.data.isEstimate == 'Y') {
                            if (response.data.findType == 'device') {
                                this.$router.push(`/estimateComparison/modelEstimateCard?surveyCode=${this.$route.query.surveyCode}`);
                            }

                            if (response.data.findType == 'cost') {
                                this.$router.push(`/estimateComparison/billPaidEstimateCard?surveyCode=${this.$route.query.surveyCode}`);
                            }
                        }
                    }, 3000);
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
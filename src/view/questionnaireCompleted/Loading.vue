<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <img class="loading-img" src="/images/loading.gif">

        <div class="loading-page-box-1 animate__animated animate__fadeInUp">
            {{ address }} 주변 매장들의<br>
            {{ estimateText }} 견적을<br>
            확인하고 있어요.
        </div>

        <div class="loading-page-box-2 animate__animated animate__fadeInUp">
            견적을 비교하여 최적의 선택지를<br>
            알려드릴게요!
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            address: localStorage.getItem('address'),
            estimateText: null,
        }
    },

    created() {
        var lookingForModelCheck = localStorage.getItem('lookingForModelCheck');
        var selectBillPaid = localStorage.getItem('selectBillPaid');
        var selectedModel = localStorage.getItem('selectedModel');

        if (lookingForModelCheck == "0") {
            this.estimateText = selectBillPaid + " 원대"
        }

        if (lookingForModelCheck == "1") {
            this.estimateText = selectedModel + "번 모델"
        }
    },

    mounted() {
        setTimeout(() => {
            this.$router.push("/questionnaireCompleted/Found");
        }, 3000);
    },

    methods: {
        onBackBtn() {
            this.$router.push("/questionnaire/selectLocation");
        },
    }
}
</script>

<style scoped>
.back-btn-box {
    align-items: flex-start;
    padding: 0px;

    width: 100%;
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
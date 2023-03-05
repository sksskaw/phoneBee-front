<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <img class="found-img" src="/images/found_check.svg">

        <div class="found-page-box-1">
            {{ address }}<br>
            주변 매장들의 견적을 비교하여<br>
            최적의 {{ estimateText }} 견적을 찾았어요!<br>
        </div>

        <div class="check-btn" @click="onCheck">최적 견적 확인하기</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lookingForModelCheck: localStorage.getItem('lookingForModelCheck'),
            address: localStorage.getItem('address'),
            estimateText: null,
        }
    },

    created() {
        var selectBillPaid = localStorage.getItem('selectBillPaid');
        var selectedModel = localStorage.getItem('selectedModel');

        if (this.lookingForModelCheck == "0") {
            this.estimateText = selectBillPaid + " 원대"
        }

        if (this.lookingForModelCheck == "1") {
            this.estimateText = selectedModel + "번 모델"
        }
    },

    methods: {
        onBackBtn() {
            this.$router.push("/questionnaire/selectLocation");
        },

        onCheck() {
            if (this.lookingForModelCheck == "0") {
                this.$router.push("/estimateComparison/billPaidEstimateCard");
            }

            if (this.lookingForModelCheck == "1") {
                this.$router.push("/estimateComparison/modelEstimateCard");
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

    margin-bottom: 40px;
}

.back-btn {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.found-img {
    display: block;
    margin: 0px auto;
    width: 218px;
    height: 218px;

    margin-bottom: 96px;
}

.found-page-box-1 {
    height: 90px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 21.33px;
    line-height: 30px;
    text-align: center;

    color: #391A15;

    margin-bottom: 160px;
}

.check-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px 24px 46px 24px;
    gap: 10px;
    height: 58px;

    background: #391A15;
    border-radius: 8px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: #FFFFFF;
}
</style>
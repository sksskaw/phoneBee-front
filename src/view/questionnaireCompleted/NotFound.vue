<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <img class="not-found-img" src="/images/not_found.svg">

        <div class="not-found-page-box-1">
            입력해주신 {{ address }}<br>
            주변에는 저렴한 견적이 없어요.
        </div>

        <div class="not-found-page-box-2">
            지금 현재 {xx구} 에서는 추천이 가능해요.<br>
            xx구의 견적을 확인해 보시겠어요?
        </div>

        <div class="check-btn">최적 견적 확인하기</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            address: localStorage.getItem('address'),
        }
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

    font-family: 'Pretendard';
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

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;

    color: #391A15;

    margin-bottom: 118px;
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
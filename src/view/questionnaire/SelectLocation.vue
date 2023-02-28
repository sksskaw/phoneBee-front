<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <div class="title">
            <div>어느 동네 매장을</div>
            <div>알아봐 드릴까요?</div>
        </div>

        <div class="sub-title">상세 주소는 기입하실 필요 없어요!</div>
    </div>
</template>

<script>
export default {
    methods: {
        onBackBtn() {
            this.$router.go(-1);
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

.title {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 28.43px;
    line-height: 38px;
    color: #391A15;

    margin-bottom: 24px;
}

.sub-title {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: #AEAEAE;

    margin-bottom: 26px;
}
</style>
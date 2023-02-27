<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <div class="title">
            <div>현재 사용하고 있는</div>
            <div>통신사는 무엇인가요?</div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        onBackBtn() {
            this.$router.go(-1);
        }
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

    margin-bottom: 76px;
}
</style>
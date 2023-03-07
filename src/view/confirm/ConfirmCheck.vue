<template>
    <div class="router-div">
        <div class="close-btn-box">
            <img class="back-btn" src="/images/close.svg" @click="onBackBtn">
        </div>

        <div class="text-box">
            방문 예약이<br>
            완료되었습니다!
        </div>
        <hr width="100%" color="#E1E1E1" size="3">
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },

    methods: {
        onBackBtn() {
            this.$router.go(-1);
        },
    }
}
</script>

<style scoped>
.close-btn-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding-right: 24px;
    height: 60px;

    margin-bottom: 16px;
}

.text-box {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 21.33px;
    line-height: 30px;
    text-align: center;

    color: #391A15;
    margin-bottom: 32px;
}
</style>
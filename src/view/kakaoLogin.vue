<template>
    <div>
        <div class="close-btn-box">
            <div class="back-btn" @click="onBackBtn">&lt;</div>
            <div>로그인</div>
            <div style="width: 24px; height: 24px;"></div>
        </div>

        <div class="login-btn">
            <img src="/images/kakao_login.png">
        </div>
    </div>

    <div class="footer-wrap">
        <Footer> </Footer>
    </div>
</template>

<script>
import Footer from '@/components/MainFooter.vue';

export default {
    components: {
        Footer
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
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    width: 100%;

    margin-bottom: 26px;

    color: white;
    background-color: black;
}

.back-btn {
    width: 24px;
    height: 24px;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    align-items: center;
}

.login-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>
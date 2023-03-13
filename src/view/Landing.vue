<template>
    <div class="router-div" style="margin-top: 52px;">
        <div class="title">
            <div>핸드폰 싸게 사고싶다면? </div>
        </div>

        <div class="speech">
            <p style="margin: 0;">
                우리 동네 매장 견적<br>
                모아서 비교해드릴게요!
            </p>
        </div>

        <img class="ad-image" src="/images/ad_image_1.png">

        <button class="estimate-btn" type="button" @click="onEstimateBtn">3분만에 견적 받아보기</button>

        <div class="speech2">
            폰비가 찾은 견적은 일반 견적보다<br>
            <span style="font-weight: 700;">평균 18만원 정도 저렴해요!</span>
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
        onEstimateBtn() {
            this.$router.push("/questionnaire");
        }
    }
}
</script>
  
<style scoped>
.footer-wrap {
    position: relative;
    min-height: 100%;
}

.title {
    font-style: normal;
    font-weight: 700;
    font-size: 28.43px;
    line-height: 38px;
    color: #391A15;

    margin-bottom: 24px;
}

.speech {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: #391A15;
    margin-bottom: 18px;
}

.ad-image {
    width: 100%;
    height: auto;

    margin-bottom: 18px;
}

.estimate-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 18px 20px;
    gap: 10px;

    width: 100%;
    height: 58px;

    background: #391A15;
    border-radius: 8px;
    border: none;
    cursor: pointer;

    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: #FFFFFF;
    margin-bottom: 16px;
}

.speech2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: center;

    color: #391A15;

    margin-bottom: 52px;
}
</style>
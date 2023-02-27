<template>
    <div class="router-div">
        <div class="icon-box">
            <img class="icon" src="/images/logo_name.png">
        </div>

        <div class="title">
            <div>호갱 당하기는 싫지만,</div>
            <div>발품 팔기는 귀찮다면?</div>
        </div>

        <div class="speech">
            <p style="margin: 0;">
                귀찮게 발품 파실 필요 없어요.<br>
                동네 매장 견적을 모아서<br>
                가장 저렴한 곳을 추천해 드릴게요.
            </p>
        </div>

        <img class="ad-image" src="/images/ad_image_1.png">

        <button class="estimate-btn" type="button" @click="onEstimateBtn">3분만에 견적 받아보기</button>
    </div>

    <Footer> </Footer>
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
  
<style>
.icon {
    width: 30%;
    height: auto;
}

.icon-box {
    margin-bottom: 40px;
}

.title {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 28.43px;
    line-height: 38px;
    color: #391A15;

    margin-bottom: 40px;
}

.speech {
    font-family: 'Pretendard';
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

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: #FFFFFF;
    margin-bottom: 52px;
}
</style>
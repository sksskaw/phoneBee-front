<template>
    <div class="router-div">
        <div class="close-btn-box">
            <img class="back-btn" src="/images/close.svg" @click="onBackBtn">
        </div>

        <div class="amount-box">
            <img class="carrier-img" src="/images/skt_logo.svg">
            <span style="color: #D7D1D0;">ㅣ</span>
            <div>
                월 <span style="font-weight: 700;">19,000</span>원
            </div>
        </div>

        <div class="model-box">
            <img class="back-btn" src="/images/sample_model.svg">
            <div class="model-name">갤럭시 A53 5G 자급제</div>
            <div class="model-price"><span style="color: #AEAEAE;">출고가</span> 480,000원</div>
        </div>

        <div class="di-box-bg">
            <div class="discount-information-box">
                <div class="di-title">단말기 할인 가격 정보</div>

                <div class="di-box1">
                    <div>공시지원금</div>
                    <div style="font-weight: 700;">-94,567원</div>
                </div>

                <div class="di-box2">
                    <div>매장 특별 지원금</div>
                    <div>-94,567원</div>
                </div>

                <div class="di-box3">(공시지원금 + 매장 특별 지원금)</div>

                <div class="di-box4">
                    <div>총 할인금액:</div>
                    <div>189,134원</div>
                </div>
                <hr width="100%" color="#E1E1E1" size="1">

                <div class="di-box5">
                    <div>단말기 월 할부 금액 :</div>
                    <div>19,000원</div>
                </div>

                <div class="di-box6">* 매장 특별 지원금 지급 조건 65요금제 6개월 유지</div>
            </div>

            <div class="store-information-box">
                <div class="si-title">판매점 정보</div>

                <div class="si-box">
                    <div class="si-box-name">상호명</div>
                    <div>싸다폰</div>
                </div>

                <div class="si-box">
                    <div class="si-box-name">주소</div>
                    <div>서울시 마포구 양화로 160 수성빌딩 101호 (주소가 길어진다면 여기까지)</div>
                </div>

                <div class="si-box">
                    <div class="si-box-name">평점</div>
                    <div class="si-score-box">
                        <img src="/images/star.svg"><span style="font-weight: 700;">4.5점</span>
                    </div>
                </div>
            </div>
        </div>
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

    margin-bottom: 17px;
}

.amount-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 12px;

    height: 32px;
    margin-left: 24px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 21.33px;
    line-height: 30px;
    text-align: center;

    color: #391A15;
    margin-bottom: 17px;
}

.carrier-img {
    height: 32px;
    width: 79px;
}

.model-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 8px;

    height: 183px;
    margin-bottom: 48px;
}

.model-name {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;

    color: #000000;
}

.model-price {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: #000000;
}

.di-box-bg {
    background: #F7F7F7;
    padding: 12px;
}

.discount-information-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 24px;
    gap: 4px;

    background: #FFFFFF;
    box-shadow: 0px 1px 4px rgba(48, 48, 48, 0.04);
    border-radius: 12px;

    margin-bottom: 12px;
}

.di-title {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;

    color: #000000;
    margin-bottom: 22px;
}

.di-box1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;

    width: 100%;
    height: 22px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: #828282;
    margin-bottom: 8px;
}

.di-box2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;

    width: 100%;
    height: 22px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;

    color: #391A15;
    margin-bottom: 20px;
}

.di-box3 {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 26px;

    color: #391A15;
}

.di-box4 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;

    width: 100%;
    height: 22px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;

    text-align: right;

    color: #FF2500;
}

.di-box5 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;

    width: 100%;
    height: 26px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;

    color: #391A15;
    margin-bottom: 20px;
}

.di-box6 {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;

    color: #828282;
}

.store-information-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 24px;
    gap: 4px;

    background: #FFFFFF;
    box-shadow: 0px 1px 4px rgba(48, 48, 48, 0.04);
    border-radius: 12px;
}

.si-title {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;

    color: #000000;
    margin-bottom: 22px;
}

.si-box {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 48px;
    
    height: auto;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: #828282;
}

.si-box-name {
    flex-shrink: 0;
    width: 44px;
}

.si-score-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 4px;
}
</style>
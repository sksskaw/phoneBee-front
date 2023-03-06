<template>
    <div class="router-div">
        <div class="box-1">
            {{ selectedModel }} 기기로<br>
            변경하기 위한 <span style="color: #E5B40F;">최적의 견적</span>을<br>
            발견했어요!
        </div>

        <div class="box-2">
            핸드폰 가격보다 <span style="color: #E5B40F;">{{ totalDiscountAmount }}</span> 더 저렴해요
        </div>

        <div style="height: 220px; margin-bottom: 48px; border:solid 1px">비교 그래프 박스</div>

        <div class="box-3">
            {{ today }} {{ sigungu }}<br>
            판매점들의 {{ selectedModel }} 기기<br>
            견적을 비교해 보았어요!<br>
        </div>

        <div>
            <input type="radio" id="skt" v-model="selectedCard" value="skt" class="estimate-radio" @click="toDetail">
            <label for="skt">
                <div class="estimate-radio-card">
                    <img class="carrier-icon" src="/images/skt_logo.svg">
                    <img class="badge-icon" src="/images/recommended_badge.svg">

                    <div class="cost">{{ cost }}</div>
                    <div class="discount">{{ discount }}</div>
                    <div class="amount">{{ amount }}원</div>
                    <div class="card-text">단말기 월 할부금</div>
                </div>
            </label>

            <input type="radio" id="kt" v-model="selectedCard" value="kt" class="estimate-radio">
            <label for="kt">
                <div class="estimate-radio-card">
                    <img class="carrier-icon" src="/images/kt_logo.svg">
                    <img class="badge-icon" src="/images/carrier_change_badge.svg">

                    <div class="cost">{{ cost }}</div>
                    <div class="discount">{{ discount }}</div>
                    <div class="amount">{{ amount }}원</div>
                    <div class="card-text">단말기 월 할부금</div>
                </div>
            </label>

            <input type="radio" id="lgu+" v-model="selectedCard" value="lgu+" class="estimate-radio">
            <label for="lgu+">
                <div class="estimate-radio-card">
                    <img class="carrier-icon" src="/images/lgu+_logo.svg">

                    <div class="cost">{{ cost }}</div>
                    <div class="discount">{{ discount }}</div>
                    <div class="amount">{{ amount }}원</div>
                    <div class="card-text">단말기 월 할부금</div>
                </div>
            </label>

            <div class="more-btn">요금 더보기</div>
        </div>
    </div>
</template>

<script>
import strg from "@/utils/strg";

export default {
    data() {
        return {
            today: strg.getCurrentMonthAndDate(),
            selectedModel: localStorage.getItem('selectedModel'),
            totalDiscountAmount: "총 할인 금액",
            sigungu: localStorage.getItem('sigungu'),

            cost: strg.priceFormat(23000),
            discount: strg.priceFormat(-4000),
            amount: strg.priceFormat(19000),

            selectedCard: null,
        }
    },

    methods: {
        toDetail() {
            this.$router.push("/estimateComparison/cardDetail");
        }
    }
}
</script>

<style scoped>
.box-1 {
    height: 90px;
    margin: 90px 0px 40px 0px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 21.33px;
    line-height: 30px;

    color: #391A15;
}

.box-2 {
    height: 22px;
    margin-bottom: 12px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;

    color: #391A15;
}

.box-3 {
    height: 90px;
    margin-bottom: 40px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 21.33px;
    line-height: 30px;

    color: #391A15;
}

.more-btn {
    margin-top: 10px;
    margin-bottom: 24px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    height: 54px;
    border: 1px solid #AEAEAE;
    border-radius: 8px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: #AEAEAE;
}
</style>
<template>
    <div class="router-div">
        <div class="box-1">
            원래 가격보다<br>
            <span style="color: #E5B40F;">{{ totalDiscountPrice }}원</span> 더 저렴해요
        </div>

        <div class="graph">
            <Graph v-bind:cardList="cardList"></Graph>
        </div>

        <div class="box-3">
            <span class="box-3-date">{{ date.month }}월 {{ date.day }}일 {{ date.findArea }}</span><br>
            {{ deviceName }} 최적의 견적<br>
            을 발견했어요!<br>
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
import Graph from '@/components/EstimateComparisonGraph.vue';
import strg from "@/utils/strg";
import apiEstimate from "@/api/estimate";

export default {
    components: {
        Graph
    },

    data() {
        return {
            date: {},
            deviceName: '',
            totalDiscountPrice: '',
            cardList: [],

            cost: strg.priceFormat(23000),
            discount: strg.priceFormat(-4000),
            amount: strg.priceFormat(19000),

            selectedCard: null,
        }
    },

    mounted() {
        this.getEstimateList()
    },

    methods: {
        toDetail() {
            this.$router.push("/estimateComparison/cardDetail");
        },

        getEstimateList() {
            apiEstimate.getEstimateList("amplS3FCM1JiLzhHenVFYzNBYUR2dz09")
                .then(response => {
                    this.date = response.data.estimate.date
                    this.deviceName = response.data.estimate.deviceName
                    this.totalDiscountPrice = strg.priceFormat(response.data.estimate.totalDiscountPrice)
                    this.cardList = response.data.estimate.list
                    console.log(this.cardList)
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }
}
</script>

<style scoped>
.box-1 {
    margin: 90px 0px 32px 0px;

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

.box-3-date {
    font-family: 'Pretendard';
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;

    color: #828282;
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

.graph {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 220px;
    margin-bottom: 48px
}
</style>
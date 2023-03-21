<template>
    <div class="router-div">
        <div class="box-1">
            원래 가격보다<br>
            <span style="color: #E5B40F;">{{ totalDiscountPrice }}원</span> 더 저렴해요
        </div>

        <div class="graph">
            <Graph v-bind:barChart="barChart"></Graph>
        </div>

        <div class="box-3">
            <span class="box-3-date">{{ date.month }}월 {{ date.day }}일 {{ date.findArea }}</span><br>
            {{ deviceName }} 최적의 견적<br>
            을 발견했어요!<br>
        </div>

        <div>
            <div v-for="item in cardList.slice(0, showListIndex)">
                <input type="radio" :id="item.planPriceIdx" v-model="selectedCard" :value="item.planPriceIdx"
                    class="estimate-radio" @click="toDetail">
                <label :for="item.planPriceIdx">
                    <div class="estimate-radio-card">
                        <img class="carrier-icon" :style="getCarrierLogoStyle(item.telecomName)"
                            :src="getCarrierLogo(item.telecomName)">

                        <img v-if="item.badge.message == '추천' && item.badge.show == 'Y'" class="badge-icon"
                            src="/images/recommended_badge.svg">

                        <img v-if="item.badge.message == '통신사이동' && item.badge.show == 'Y'" class="badge-icon"
                            src="/images/carrier_change_badge.svg">

                        <div class="cost">{{ priceFormat(item.monthPrice) }}원</div>
                        <div class="discount">{{ priceFormat(item.discountMonthPrice - item.monthPrice) }}원</div>
                        <div class="amount">{{ priceFormat(item.discountMonthPrice) }}원</div>
                        <div class="card-text">단말기 월 할부금</div>
                        <img class="arrow-right" src="/images/arrow_right.png">
                    </div>
                </label>
            </div>
            <div class="more-btn" id="more-btn" @click="onMore(selectedCard)">요금 더보기</div>
        </div>
    </div>
</template>

<script>
import Graph from '@/components/EstimateComparisonGraph.vue';
import strg from "@/utils/strg";
import apiEstimate from "@/api/estimate";
import cookie from '@/utils/cookie';

export default {
    components: {
        Graph
    },

    data() {
        return {
            date: {},
            deviceName: '',
            totalDiscountPrice: '',
            barChart: [],
            cardList: [],
            showListIndex: 3,
            findType: '',
            selectedCard: null,
        }
    },

    mounted() {
        var enmemberidx = cookie.getCookie('Enmemberidx')
        if (enmemberidx == '' || enmemberidx == null) {
            const urlParams = new URL(location.href).searchParams;
            enmemberidx = urlParams.get('Enmemberidx');
            cookie.setCookie('Enmemberidx', enmemberidx, 1)
        }

        if (enmemberidx == '' || enmemberidx == null) {
            this.$router.push("/");
        }

        this.getEstimateList(enmemberidx)
    },

    methods: {
        toDetail(ref) {
            this.$router.push(`/estimateComparison/cardDetail?surveyCode=${this.$route.query.surveyCode}&planPriceIdx=${ref.target.id}&findType=${this.findType}`);
        },

        onMore() {
            let length = this.cardList.length
            this.showListIndex = this.showListIndex + 3;

            if (length <= this.showListIndex) {
                var btn = document.getElementById('more-btn')
                btn.style.display = "none";
                return length
            }

            return this.showListIndex
        },

        getEstimateList(enmemberidx) {
            apiEstimate.getEstimateList(this.$route.query.surveyCode, enmemberidx)
                .then(response => {
                    this.date = response.data.estimate.date
                    this.deviceName = response.data.estimate.deviceName
                    this.totalDiscountPrice = strg.priceFormat(response.data.estimate.totalDiscountPrice)
                    if (this.totalDiscountPrice < 0) this.totalDiscountPrice = 0
                    this.cardList = response.data.estimate.list
                    this.barChart = response.data.estimate.barChart
                    this.findType = response.data.estimate.findType
                })
                .catch(e => {
                    console.log(e)
                });
        },

        getCarrierLogo(name) {
            return strg.getCarrierLogo(name)
        },

        getCarrierLogoStyle(name) {
            return strg.getCarrierLogoSmallStyle(name)
        },

        priceFormat(price) {
            return strg.priceFormat(price)
        }
    }
}
</script>

<style scoped>
.box-1 {
    margin: 90px 0px 32px 0px;


    font-style: normal;
    font-weight: 700;
    font-size: 21.33px;
    line-height: 30px;

    color: #391A15;
}

.box-2 {
    height: 22px;
    margin-bottom: 12px;


    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;

    color: #391A15;
}

.box-3 {
    height: 90px;
    margin-bottom: 40px;


    font-style: normal;
    font-weight: 700;
    font-size: 21.33px;
    line-height: 30px;

    color: #391A15;
}

.box-3-date {

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
    cursor: pointer;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    height: 54px;
    border: 1px solid #AEAEAE;
    border-radius: 8px;


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

.arrow-right {
    position: absolute;
    right: 4%;
    top: 45%;

    height: 16.125px;
    width: 8.625px;
}
</style>
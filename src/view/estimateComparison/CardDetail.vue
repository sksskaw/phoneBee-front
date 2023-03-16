<template>
    <div class="router-div">
        <div class="close-btn-box">
            <img class="back-btn" src="/images/close.svg" @click="onBackBtn">
        </div>

        <div class="amount-box">
            <img class="carrier-img" :src="telecomCode">
            <span style="color: #D7D1D0;">ㅣ</span>
            <div>
                월 <span style="font-weight: 700;">{{ monthPrice }}</span>원
            </div>
        </div>

        <div class="model-box">
            <img class="model-img" :src="deviceImgUrl">
            <div class="model-name">{{ deviceName }}</div>
            <div class="model-price"><span style="color: #AEAEAE;">출고가</span> {{ factoryPrice }}원</div>
        </div>

        <div class="di-box-bg">
            <div class="discount-information-box">
                <div class="di-title">단말기 할인 가격 정보</div>

                <div class="di-box1">
                    <div>공시지원금</div>
                    <div style="font-weight: 700;">-{{ publicSubsidy }}원</div>
                </div>

                <div class="di-box2">
                    <div>매장 특별 지원금</div>
                    <div>-{{ storeSupport }}원</div>
                </div>

                <div class="di-box3">(공시지원금 + 매장 특별 지원금)</div>

                <div class="di-box4">
                    <div>총 할인금액:</div>
                    <div>{{ totalDiscountPrice }}원</div>
                </div>
                <hr width="100%" color="#E1E1E1" size="1">

                <div class="di-box5">
                    <div>단말기 월 할부 금액 :</div>
                    <div>{{ monthPrice }}원</div>
                </div>

                <div class="di-box6">* 매장 특별 지원금 지급 조건 65요금제 6개월 유지</div>
            </div>

            <div class="store-information-box">
                <div class="si-title">판매점 정보</div>

                <div class="si-box">
                    <div class="si-box-name">상호명</div>
                    <div>{{ storeName }}</div>
                </div>

                <div class="si-box">
                    <div class="si-box-name">주소</div>
                    <div>{{ storeAddress }}</div>
                </div>

                <div class="si-box">
                    <div class="si-box-name">평점</div>
                    <div class="si-score-box">
                        <img src="/images/star.svg"><span style="font-weight: 700;">{{ storeGrade }}점</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="review-box">
            <div class="review-count-box">판매점 리뷰
                <span style="color: #828282; font-weight: 400;">{{ reviews.length }}개</span>
            </div>

            <div class="review-content-box" v-for="item in reviews">
                <div class="review-user-info">
                    <div class="user-profile">
                        <img src="/images/user_profile_default.svg">
                    </div>
                    <div class="user-name-grade">
                        <div class="user-name">
                            <div>{{ item.writer }}</div>
                            <div style="font-weight: 400; font-size: 12px; line-height: 18px;">{{ item.registDateTime }}
                            </div>
                        </div>
                        <div class="grade-box">
                            <img v-for="i in item.grade" src="/images/star.svg">
                        </div>
                    </div>
                </div>
                <div class="review-content">
                    {{ item.review }}
                </div>
            </div>
        </div>

        <div class="confirm-box">
            <div v-if="loading == false" class="confirm-btn" @click="onConfirm">견적 확정하기</div>
            <div v-if="loading == true" class="confirm-btn">
                <Vue3Lottie :animationData="loadingImg" />
            </div>
        </div>

        <div style="height: 102px;"></div>
    </div>
</template>

<script>
import strg from "@/utils/strg";
import apiEstimate from "@/api/estimate";
import cookie from '@/utils/cookie';

import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import loadingImg from '@/assets/loading.json'
export default {
    components: {
        Vue3Lottie
    },

    data() {
        return {
            loading: false,
            loadingImg,

            monthPrice: '',
            deviceImgUrl: '',
            deviceName: '',
            factoryPrice: '',
            telecomCode: '',

            publicSubsidy: '',
            storeSupport: '',
            totalDiscountPrice: '',
            monthPrice: '',

            storeAddress: '',
            storeGrade: '',
            storeName: '',

            reviews: [],
        }
    },

    mounted() {
        var enmemberidx = cookie.getCookie('Enmemberidx')
        if (enmemberidx == '' || enmemberidx == null)
            this.$router.push("/login");

        this.getEstimateDetail(enmemberidx)
    },

    methods: {
        onBackBtn() {
            this.$router.go(-1);
        },

        onConfirm() {
            this.loading = true
            var enmemberidx = cookie.getCookie('Enmemberidx')
            this.postEstimateComplete(enmemberidx)
        },

        getEstimateDetail(enmemberidx) {
            apiEstimate.getEstimateDetail(this.$route.query.surveyCode, this.$route.query.planPriceIdx, enmemberidx)
                .then(response => {
                    const data = response.data.estimate

                    this.monthPrice = this.priceFormat(data.deviceSection.monthPrice)
                    this.deviceImgUrl = data.deviceSection.deviceImgUrl
                    this.deviceName = data.deviceSection.deviceName
                    this.factoryPrice = this.priceFormat(data.deviceSection.factoryPrice)
                    this.telecomCode = this.getCarrierLogo(data.deviceSection.telecomCode)

                    this.publicSubsidy = this.priceFormat(data.monthPriceSection.publicSubsidy)
                    this.storeSupport = this.priceFormat(data.monthPriceSection.storeSupport)
                    this.totalDiscountPrice = this.priceFormat(data.monthPriceSection.totalDiscountPrice)
                    this.monthPrice = this.priceFormat(data.monthPriceSection.monthPrice)

                    this.storeAddress = data.storeSection.storeAddress
                    this.storeGrade = data.storeSection.storeGrade
                    this.storeName = data.storeSection.storeName

                    this.reviews = data.reviewSection
                })
                .catch(e => {
                    console.log(e)
                });
        },

        postEstimateComplete(enmemberidx) {
            apiEstimate.postEstimateComplete(this.$route.query.surveyCode, this.$route.query.planPriceIdx, enmemberidx)
                .then(response => {
                    const estimateCode = response.data.estimateCode
                    this.$router.push(`/confirm/confirmEstimate?estimateCode=${estimateCode}&findType=${this.$route.query.findType}`);
                })
                .catch(e => {
                    console.log(e)
                });
        },

        getCarrierLogo(name) {
            return strg.getCarrierLogo(name)
        },

        priceFormat(price) {
            return strg.priceFormat(price)
        }
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

.model-img {
    height: 125px;
}

.model-name {

    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;

    color: #000000;
}

.model-price {

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


    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;

    color: #391A15;
    margin-bottom: 20px;
}

.di-box3 {

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


    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;

    color: #391A15;
    margin-bottom: 20px;
}

.di-box6 {

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

.confirm-box {
    position: fixed;
    margin: 0 auto;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 102px;
    background: #FFFFFF;

    box-shadow: 0px -4px 20px 0px rgba(48, 48, 48, 0.1);
}

.confirm-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 24px 34px 24px;
    gap: 10px;

    height: 58px;
    background: #391A15;
    border-radius: 8px;


    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: #FFFFFF;
}

.review-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 24px;
    gap: 24px;

    background: #FFFFFF;
}

.review-count-box {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;

    height: 22px;


    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
}

.review-content-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;
}

.review-user-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 16px;

    height: 48px;
}

.user-name-grade {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;

    height: 46px;
}

.user-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 8px;


    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;

    color: #828282;
}

.review-content {

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: #828282;
}

.grade-box {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
}
</style>
<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <div class="party-popper-box">
            <img src="/images/party_popper.svg">
            <div class="party-popper-text">
                <span style="color: #E5B40F;">{{ month }}월 {{ day }}일</span>에 선택하신<br>
                견적이 확정되었습니다!
            </div>
        </div>
        <hr width="100%" color="#E1E1E1" size="3">

        <div class="estimate-info">
            <div class="ei-title">
                <div>확정된 견적 내역</div>
                <div style="color: #E5B40F;">{{ year }}년 {{ month }}월 {{ day }}일</div>
            </div>
            <div class="cautionary">* 방문 일자가 달라지면 견적 금액이 변경될 수 있습니다.</div>

            <div class="ei-model">
                <div class="sub-title">핸드폰 기기명</div>
                <div class="info-box">{{ deviceName }}</div>
            </div>

            <div class="ei-total-dc">
                <div class="sub-title">총 할인 금액</div>
                <div class="amount">{{ totalDiscountPrice }}원</div>
            </div>

            <div class="ei-monthly-amount">
                <div class="sub-title">단말기 월 할부금</div>
                <div class="amount">{{ monthPrice }}원</div>
            </div>

            <div class="ei-condition">
                <div class="sub-title">매장 특별 지원금 지급 조건</div>
                <div class="info-box">{{ planName }} 6개월 유지 (6개월 뒤 바꿀 수 있어요)</div>
            </div>

            <div class="ei-store-info">
                <div class="sub-title">판매점 정보</div>
                <div class="si-box">
                    <div class="si-box-name">상호명</div>
                    <div>{{ storeName }}</div>
                </div>

                <div class="si-box">
                    <div class="si-box-name">주소</div>
                    <div>{{ storeAddress }}
                        <img style="position: relative; bottom: -5px;" src="/images/copy.svg" @click="copyAddress">
                    </div>
                </div>
            </div>

            <div class="ei-map" id="ei-map"></div>
        </div>
        <hr width="100%" color="#E1E1E1" size="3">

        <div class="phrase-frame">
            <div class="phrase-box">
                <div class="phrase">
                    확정된 견적 그대로,<br>
                    상담없이 바로 개통 가능해요.
                </div>
                <div class="phrase-sub">
                    *해당 견적은 유효기간이 있으니<br>
                    이 기회를 놓치지 마세요.
                </div>
            </div>
        </div>
        <hr width="100%" color="#E1E1E1" size="3">

        <div class="reservation-date">
            <div style="font-weight: 700; font-size: 16px;">매장 방문 가능 시간 선택</div>
            <div class="week-box">
                <div style="margin-bottom: 12px;">날짜 선택</div>

                <div class="weeks">
                    <div class="date" v-for="i, index in 7">
                        <div style="color: #828282;">{{ this.week[(new Date().getDay() + index) % 7] }}</div>
                        <input type="radio" :id="index" v-model="selectedDate" :value="todayDate + index"
                            class="select-date-radio">
                        <label :for="index">
                            <div class="select-date">{{ todayDate + index }}</div>
                        </label>
                        <div v-if="index == 0" class="point"></div>
                    </div>
                </div>
            </div>

            <div class="reservation-time">
                <div>시간 선택</div>

                <div class="times">
                    <div v-for="time in times">
                        <input type="radio" :id="time" v-model="selectedTime" :value="time" class="select-time-radio">
                        <label :for="time">
                            <div class="select-time">
                                {{ time }}
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading == false" class="reservation-btn" @click="onReservation()">새 핸드폰 받아보기</div>
        <div v-if="loading == true" class="reservation-btn">
            <Vue3Lottie :animationData="loadingImg" />
        </div>

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
            week: ['일', '월', '화', '수', '목', '금', '토'],
            times: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
                "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"],
            today: strg.getCurrentMonthAndDate(),
            todayDate: new Date().getDate(),

            year: '',
            month: '',
            day: '',

            deviceName: '',
            monthPrice: '',
            planName: '',
            totalDiscountPrice: '',

            storeName: '',
            storeAddress: '',

            selectedDate: new Date().getDate(),
            selectedTime: null,

            loading: false,
            loadingImg,
        }
    },

    mounted() {
        var enmemberidx = cookie.getCookie('Enmemberidx')
        if (enmemberidx == '' || enmemberidx == null)
            this.$router.push("/");

        this.getEstimateConfirm(enmemberidx)
    },

    methods: {
        onBackBtn() {
            this.$router.go(-1);
        },

        copyAddress() {
            const textArea = document.createElement('textarea')
            document.body.appendChild(textArea)
            textArea.value = this.storeAddress
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
        },

        initMap() {
            const container = document.getElementById("ei-map");
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 5,
            };

            this.map = new kakao.maps.Map(container, options);
            this.geocoder = new kakao.maps.services.Geocoder();
            this.marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(33.450701, 126.570667),
                map: this.map
            });

            this.geocoder.addressSearch(this.storeAddress, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {

                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    this.map.setCenter(coords);
                    this.marker.setPosition(coords)
                }
            });
        },

        getMapPosition() {
            const script = document.createElement("script");
            script.onload = () => kakao.maps.load(this.initMap);
            script.src =
                "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" + process.env.VUE_APP_KAKAO_KEY + "&libraries=services";
            document.head.appendChild(script);
        },

        getEstimateConfirm(enmemberidx) {
            apiEstimate.getEstimateConfirm(this.$route.query.estimateCode, enmemberidx)
                .then(response => {
                    const data = response.data.estimate

                    this.year = data.confirmSection.date.year
                    this.month = data.confirmSection.date.month
                    this.day = data.confirmSection.date.day

                    this.deviceName = data.confirmSection.deviceName
                    this.monthPrice = this.priceFormat(data.confirmSection.monthPrice)
                    this.planName = data.confirmSection.planName
                    this.totalDiscountPrice = this.priceFormat(data.confirmSection.totalDiscountPrice)

                    this.storeName = data.storeSection.storeName
                    this.storeAddress = data.storeSection.storeAddress
                    this.getMapPosition()
                })
                .catch(e => {
                    console.log(e)
                });
        },

        postReservationComplete(reservationDate, reservationTime) {
            const enmemberidx = cookie.getCookie('Enmemberidx')
            const params = {
                reservationDate: reservationDate,
                reservationTime: reservationTime,
            }
            apiEstimate.postReservationComplete(this.$route.query.estimateCode, params, enmemberidx)
                .then(response => {
                    this.$router.push(`/confirm/confirmCheck?reservationCode=${response.data.reservationCode}`);
                })
                .catch(e => {
                    console.log(e)
                });
        },

        onReservation() {
            this.loading = true
            if (this.selectedDate == null || this.selectedTime == null) {
                alert('예약 날짜 및 시간을 선택해 주세요')
                this.loading = false
                return
            }

            const reservationDate = `${this.year}-${this.month}-${this.selectedDate}`
            this.postReservationComplete(reservationDate, this.selectedTime)
        },

        priceFormat(price) {
            return strg.priceFormat(price)
        }
    }
}
</script>

<style scoped>
.back-btn-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 60px;
}

.back-btn {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.party-popper-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 8px;

    height: 208px;
    background-color: white;
    margin-bottom: 12px;
}

.party-popper-text {
    height: 60px;

    font-style: normal;
    font-weight: 700;
    font-size: 21.33px;
    line-height: 30px;

    text-align: center;
    color: #391A15;
}

.estimate-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 24px;
    gap: 16px;

    background: #FFFFFF;
}

.ei-title {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0px;

    width: 100%;
    height: 22px;

    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;

    color: #000000;
    margin-bottom: 6px;
}

.cautionary {
    height: 18px;

    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;

    color: #828282;
    margin-bottom: 6px;
}

.ei-model {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0px;

    height: 48px;
}

.sub-title {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: #828282;
}

.info-box {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    text-align: right;

    color: #391A15;
}

.ei-total-dc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0px;

    height: 64px;
}

.amount {
    font-style: normal;
    font-weight: 700;
    font-size: 28.43px;
    line-height: 38px;
    text-align: right;

    color: #391A15;
}

.ei-monthly-amount {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0px;

    height: 64px;
}

.ei-condition {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0px;

    height: 48px;
}

.ei-store-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
}

.si-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 40px;

    height: auto;

    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;

    color: #391A15;
}

.si-box-name {
    flex-shrink: 0;
    width: 44px;
}

.ei-map {
    width: 100%;
    height: 160px;
    border-radius: 4px;
    background-color: gainsboro;
}

.phrase-frame {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    gap: 24px;
}

.phrase-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 12px;
}

.phrase {
    height: 60px;

    font-style: normal;
    font-weight: 700;
    font-size: 21.33px;
    line-height: 30px;
    text-align: center;

    color: #000000;
}

.phrase-sub {
    height: 36px;


    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;

    text-align: center;
    color: #828282;
}

.reservation-date {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 24px;
    gap: 24px;
    background: #FFFFFF;


    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: #000000;

    margin-bottom: 10px;
}

.week-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;

    width: 100%;
}

.weeks {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;
    gap: 7px;
    width: 100%;


    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    text-align: center;
}

.date {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 8px;
}

.select-date-radio {
    display: none;
}

.select-date {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.select-date-radio:hover+label div {
    background: #FFD340;
    color: #FFFFFF;
}

.select-date-radio:checked+label div {
    background: #FFD340;
    color: #FFFFFF;
}

.point {
    width: 4px;
    height: 4px;

    background: #000000;
    border-radius: 4px;
}

.reservation-time {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;
}

.times {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 6px;
    width: 360px;
    height: 34px;

    white-space: nowrap;
    overflow-x: scroll;
}

.times {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.times::-webkit-scrollbar {
    display: none;
}

.select-time-radio {
    display: none;
}

.select-time-radio:hover+label div {
    background: #FFD340;
    color: #FFFFFF;
}

.select-time-radio:checked+label div {
    background: #FFD340;
    color: #FFFFFF;
}

.select-time {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4px;

    width: 68px;
    height: 34px;

    background: #F7F7F7;
    border-radius: 20px;
}

.reservation-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px 24px 34px 24px;
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
</style>
<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <div class="party-popper-box">
            <img src="/images/party_popper.svg">
            <div class="party-popper-text">
                <span style="color: #E5B40F;">{{ today }}</span>에 선택하신<br>
                견적이 확정되었습니다!
            </div>
        </div>
        <hr width="100%" color="#E1E1E1" size="3">

        <div class="estimate-info">
            <div class="ei-title">
                <div>확정된 견적 내역</div>
                <div style="color: #E5B40F;">{{ new Date().getFullYear() }}년 {{ today }}</div>
            </div>
            <div class="cautionary">* 방문 일자가 달라지면 견적 금액이 변경될 수 있습니다.</div>

            <div class="ei-model">
                <div class="sub-title">핸드폰 기기명</div>
                <div class="info-box">갤럭시 A53 5G 자급제</div>
            </div>

            <div class="ei-total-dc">
                <div class="sub-title">총 할인 금액</div>
                <div class="amount">189,134원</div>
            </div>

            <div class="ei-monthly-amount">
                <div class="sub-title">단말기 월 할부금</div>
                <div class="amount">19,000원</div>
            </div>

            <div class="ei-condition">
                <div class="sub-title">매장 특별 지원금 지급 조건</div>
                <div class="info-box">99 요금제 6개월 유지</div>
            </div>

            <div class="ei-store-info">
                <div class="sub-title">판매점 정보</div>
                <div class="si-box">
                    <div class="si-box-name">상호명</div>
                    <div>싸다폰</div>
                </div>

                <div class="si-box">
                    <div class="si-box-name">주소</div>
                    <div>{{ storeAddress }}</div>
                </div>

                <div class="si-box">
                    <div class="si-box-name"></div>
                    <div>
                        <img src="/images/copy.svg" @click="copyAddress">
                    </div>
                </div>
            </div>

            <div class="ei-map" id="ei-map"></div>
        </div>
        <hr width="100%" color="#E1E1E1" size="3">

        <div class="phrase">
            sample 확정된 견적 그대로,<br>
            상담없이 바로 개통 가능해요.
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

        <div class="reservation-btn" @click="onReservation()">새 핸드폰 받아보기</div>
    </div>
</template>

<script>
import strg from "@/utils/strg";
export default {
    data() {
        return {
            week: ['일', '월', '화', '수', '목', '금', '토'],
            times: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
                "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"],
            today: strg.getCurrentMonthAndDate(),
            todayDate: new Date().getDate(),
            storeAddress: "서울시 마포구 양화로 160 수성빌딩 101호",

            selectedDate: new Date().getDate(),
            selectedTime: null,
            nowHours: ('0' + new Date().getHours()).slice(-2),
        }
    },

    mounted() {
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(this.initMap);
        script.src =
            "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" + process.env.VUE_APP_KAKAO_KEY + "&libraries=services";
        document.head.appendChild(script);
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

        onReservation() {
            this.$router.push("/confirm/confirmCheck");
        },
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

    font-family: 'Pretendard';
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

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;

    color: #000000;
    margin-bottom: 6px;
}

.cautionary {
    height: 18px;

    font-family: 'Pretendard';
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
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: #828282;
}

.info-box {
    font-family: 'Pretendard';
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
    font-family: 'Pretendard';
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

    height: 100px;
}

.si-box {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 40px;

    height: auto;

    font-family: 'Pretendard';
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

.phrase {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    align-items: center;
    height: 116px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 21.33px;
    line-height: 30px;

    color: #000000;
    background: #FFFFFF;
}

.reservation-date {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 24px;
    gap: 24px;
    background: #FFFFFF;

    font-family: 'Pretendard';
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

    font-family: 'Pretendard';
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

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: #FFFFFF;
}
</style>
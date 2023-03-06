<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>


        <div class="container">
            <div class="party-popper-box">
                <img src="/images/party_popper.svg">
                <div class="party-popper-text">
                    <span style="color: #E5B40F;">{{ today }}</span>에 선택하신<br>
                    견적이 확정되었습니다!
                </div>
            </div>

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

            <div class="phrase">
                sample 확정된 견적 그대로,<br>
                상담없이 바로 개통 가능해요.
            </div>

            <div class="reservation-date">
                <div style="font-weight: 700; font-size: 16px;">매장 방문 가능 시간 선택</div>
                <div class="week-box">날짜 선택
                    <div class="weeks">
                        <div class="date">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import strg from "@/utils/strg";
export default {
    data() {
        return {
            today: strg.getCurrentMonthAndDate(),
            storeAddress: "서울시 마포구 양화로 160 수성빌딩 101호"
        }
    },

    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            const script = document.createElement("script");
            script.onload = () => kakao.maps.load(this.initMap);
            script.src =
                "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" + process.env.VUE_APP_KAKAO_URL + "&libraries=services";
            document.head.appendChild(script);
        }
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
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    padding: 0px;
    gap: 12px;

    background-color: #f0f0f0;
}

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

    height: 346px;
    background: #FFFFFF;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: #000000;
}

.week-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;
    height: 152px;
}

.weeks {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px 8px;
    gap: 4px;

    height: 118px;
}
</style>
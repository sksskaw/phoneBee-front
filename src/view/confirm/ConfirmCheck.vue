<template>
    <div class="router-div">
        <div class="close-btn-box">
            <img class="back-btn" src="/images/close.svg" @click="onBackBtn">
        </div>

        <div class="text-box">
            방문 예약이<br>
            완료되었습니다!
        </div>
        <hr width="100%" color="#E1E1E1" size="3">

        <div class="estimate-info">
            <div class="ei-title">
                <div>확정된 견적 내역</div>
                <div style="color: #E5B40F;">{{ year }}년 {{ month }}월 {{ day }}일</div>
            </div>

            <div class="ei-model">
                <div class="sub-title">핸드폰 기기명</div>
                <div class="info-box">{{ deviceName }}</div>
            </div>

            <div class="ei-total-dc">
                <div class="sub-title">총 할인 금액</div>
                <div class="amount">{{ totalDiscountPrice }}원</div>
            </div>

            <div class="ei-condition">
                <div class="sub-title">매장 특별 지원금 지급 조건</div>
                <div class="info-box">{{ planName }} 6개월 유지</div>
            </div>

            <div class="ei-condition">
                <div class="sub-title">방문 예약 일시 정보</div>
                <div class="info-box">2월 25일 AM 11 : 00</div>
            </div>

            <div class="ei-store-info">
                <div class="sub-title">판매점 정보</div>
                <div class="si-box">
                    <div class="si-box-name">상호명</div>
                    <div>{{ storeName }}</div>
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

            <div class="cautionary">
                * 신분증을 챙겨와 주세요!<br>
                * 방문하시는 날짜가 오늘이 아닐 경우, 견적 금액이 변경될 수 있습니다.
            </div>
        </div>
        <hr width="100%" color="#E1E1E1" size="3">

        <div class="contact-box">
            <div>추가로 궁금한 점이 있으신가요?</div>
            <div class="kakao-contact-btn">카카오톡 문의하기</div>
        </div>
    </div>
</template>

<script>
import strg from "@/utils/strg";
import apiEstimate from "@/api/estimate";
import cookie from '@/utils/cookie';

export default {
    data() {
        return {
            year: '',
            month: '',
            day: '',

            deviceName: '',
            monthPrice: '',
            planName: '',
            totalDiscountPrice: '',

            storeName: '',
            storeAddress: '',
        }
    },

    mounted() {
        var enmemberidx = cookie.getCookie('Enmemberidx')
        if (enmemberidx == '' || enmemberidx == null)
            this.$router.push("/");

        this.getReservationConfirm(enmemberidx)
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

        getReservationConfirm(enmemberidx) {
            apiEstimate.getReservationConfirm(this.$route.query.reservationCode, enmemberidx)
                .then(response => {
                    const data = response.data.reservation

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

    margin-bottom: 16px;
}

.text-box {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 21.33px;
    line-height: 30px;
    text-align: center;

    color: #391A15;
    margin-bottom: 32px;
}

.estimate-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 24px;
    gap: 22px;

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

.cautionary {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: #FF2500;
}

.contact-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 28px 24px;
    gap: 24px;

    background: #FFFFFF;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: #828282;
}

.kakao-contact-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 54px;
    border: 1px solid #AEAEAE;
    border-radius: 8px;
}
</style>
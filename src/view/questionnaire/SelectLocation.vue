<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <div class="title">
            <div>어느 동네 매장을</div>
            <div>알아봐 드릴까요?</div>
        </div>

        <div class="sub-title">상세 주소는 기입하실 필요 없어요!</div>

        <div class="search-box">
            <span @click="searchAddress">
                <input class="search-input" type="text" v-model="address" placeholder="시/군/구/동을 입력해주세요." disabled>
            </span>
            <input class="search-icon" type="button" @click="searchAddress">
        </div>

        <div class="current-location-btn" @click="onCurrentLocation">
            <div v-if="getCurrentPositionLoding == true" class="current-location-box">
                <img class="loading-icon" src="/images/search_loading_icon.gif">
            </div>

            <div v-if="getCurrentPositionLoding == false" class="current-location-box">
                <img class="target-icon" src="/images/target_icon.svg">현재 위치로 검색
            </div>
        </div>

        <transition name="slide-up">
            <div class="black-bg" id="mapContainer">
                <div class="white-bg">
                    <div class="address-check">
                        <img class="back-btn" src="/images/arrow.png" @click="closeModal">
                        주소 확인
                        <div style="width: 24px; height: 24px;"></div>
                    </div>

                    <div class="kakao-map" id="kakao-map"></div>

                    <div class="address-box">
                        <div class="buildingName">{{ buildingName }}</div>
                        <div class="roadAddress">{{ roadAddress }}</div>
                        <div class="jibunAddress">{{ jibunAddress }}</div>
                    </div>

                    <div class="estimate-btn" @click="onEstimate">
                        <img src="/images/kakao_icon.svg">
                        <div>카카오로 견적 확인하기</div>
                    </div>
                    <div style="height: 34px;"></div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import apiQuestionnaire from '@/api/questionnaire';

export default {
    data() {
        return {
            address: null,
            buildingName: "",
            roadAddress: "",
            jibunAddress: "",

            getCurrentPositionLoding: false,
            estimateBtnText: ""
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


        onCurrentLocation() {
            this.getCurrentPositionLoding = true

            navigator.geolocation.getCurrentPosition((pos) => {
                var latitude = pos.coords.latitude;
                var longitude = pos.coords.longitude;
                var coord = new kakao.maps.LatLng(latitude, longitude);

                var callback = (result, status) => {
                    if (status === kakao.maps.services.Status.OK) {

                        this.address = result[0].address.address_name;
                        localStorage.setItem('address', this.address)
                        localStorage.setItem('sido', result[0].address.region_1depth_name)
                        localStorage.setItem('sigungu', result[0].address.region_2depth_name)

                        var roadAddress = result[0].road_address
                        if (roadAddress != null) {
                            this.buildingName = roadAddress.building_name;
                            this.roadAddress = result[0].road_address.address_name;
                        } else {
                            this.roadAddress = result[0].address.address_name;
                        }

                        this.jibunAddress = "[지번] " + result[0].address.address_name;

                        var mapContainer = document.getElementById('mapContainer')
                        mapContainer.style.display = "block";

                        this.initMap()
                        this.map.setCenter(coord);
                        this.marker.setPosition(coord)
                        this.getCurrentPositionLoding = false
                    }
                };

                this.geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
                this.setEstimateBtnText()
            });
        },

        searchAddress() {
            new daum.Postcode({
                oncomplete: (data) => {
                    this.address = data.address;
                    localStorage.setItem('address', this.address)
                    localStorage.setItem('sido', data.sido)
                    localStorage.setItem('sigungu', data.sigungu)

                    this.buildingName = data.buildingName;
                    this.roadAddress = data.roadAddress ? data.roadAddress : data.autoRoadAddress;
                    this.jibunAddress = data.jibunAddress ? data.jibunAddress : data.autoJibunAddress;
                    this.jibunAddress = "[지번] " + this.jibunAddress

                    var mapContainer = document.getElementById('mapContainer')
                    this.geocoder.addressSearch(data.address, (results, status) => {
                        if (status === kakao.maps.services.Status.OK) {
                            var result = results[0];
                            var coords = new kakao.maps.LatLng(result.y, result.x);

                            mapContainer.style.display = "block";

                            this.initMap()
                            this.map.setCenter(coords);
                            this.marker.setPosition(coords)
                        }
                    });
                }
            }).open();

            this.setEstimateBtnText()
        },

        setEstimateBtnText() {
            var lookingForModelCheck = localStorage.getItem('lookingForModelCheck')
            var selectedModel = JSON.parse(localStorage.getItem('selectedModel'))
            var selectBillPaid = JSON.parse(localStorage.getItem('selectBillPaid'))

            if (lookingForModelCheck == "0") {
                this.estimateBtnText = selectBillPaid.name + " 견적 확인하기"
            }

            if (lookingForModelCheck == "1") {
                this.estimateBtnText = selectedModel.name + " 모델 견적 확인하기"
            }
        },

        closeModal() {
            var mapContainer = document.getElementById('mapContainer')
            mapContainer.style.display = "none";
        },

        initMap() {
            const container = document.getElementById("kakao-map");
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
        },

        onEstimate() {
            var lookingForModelCheck = localStorage.getItem('lookingForModelCheck')

            var selectedModel = JSON.parse(localStorage.getItem('selectedModel'))
            var selectedMobileCarrier = JSON.parse(localStorage.getItem('selectedMobileCarrier'))
            var selectedUsagePeriod = JSON.parse(localStorage.getItem('selectedUsagePeriod'))
            var selectBillPaid = JSON.parse(localStorage.getItem('selectBillPaid'))

            var sido = localStorage.getItem('sido')
            var sigungu = localStorage.getItem('sigungu')

            // 원하는 기기 없는 경우
            if (lookingForModelCheck == "0") {
                let param = {
                    useTelecomIdx: parseInt(selectedMobileCarrier.value),
                    usePeriodIdx: parseInt(selectedUsagePeriod.value),
                    monthCost: parseInt(selectBillPaid.value),
                    findArea: encodeURIComponent(sido + " " + sigungu),
                }
                console.log(param)
                this.postSurveyDeviceComplete()
            }

            // 원하는 기기 있는 경우
            if (lookingForModelCheck == "1") {
                let param = {
                    useTelecomIdx: parseInt(selectedMobileCarrier.value),
                    usePeriodIdx: parseInt(selectedUsagePeriod.value),
                    deviceIdx: parseInt(selectedModel.value),
                    findArea: encodeURIComponent(sido + " " + sigungu),
                }
                console.log(param)
                this.postSurveyCostComplete()

            }
        },

        postSurveyDeviceComplete() {
            apiQuestionnaire.postSurveyDeviceComplete(param)
                .then(response => {
                    console.log(response)
                    //this.$router.push("/questionnaireCompleted/loading");
                })
                .catch(e => {
                    console.log(e)
                });
        },

        postSurveyCostComplete() {
            apiQuestionnaire.postSurveyCostComplete(param)
                .then(response => {
                    console.log(response)
                    //this.$router.push("/questionnaireCompleted/loading");
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }
}
</script>

<style scoped>
.back-btn-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 60px;

    margin-bottom: 72px;
}

.back-btn {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.title {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 28.43px;
    line-height: 38px;
    color: #391A15;

    margin-bottom: 24px;
}

.sub-title {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: #AEAEAE;

    margin-bottom: 26px;
}

.search-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 51px;

    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 17px;
}

.search-input {
    border: none;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;

    width: 287px;
    cursor: pointer;
}

.search-input::placeholder {
    color: #AEAEAE;
}

.search-input:disabled {
    background: white;
}

.search-icon {
    background: url("../../../public/images/search_icon.png");
    background-size: cover;
    border: none;
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.current-location-btn {
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 18px 20px;
    gap: 10px;

    height: 50px;

    border: 1px solid #AEAEAE;
    border-radius: 8px;

    cursor: pointer;
}

.current-location-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 8px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;

    color: #575757;
}

.loading-icon {
    width: 24px;
    height: 24px;
}

.target-icon {
    width: 24px;
    height: 24px;
}

.black-bg {
    display: none;
    left: 0px;
    top: 0px;
    width: 100%;
    height: auto;
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
}

.white-bg {
    width: 100%;
    height: auto;
    background: white;
    border-radius: 20px 20px 0px 0px;
    animation: fadeInUp 1s;
}

@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }

    to {
        opacity: 1;
        transform: translateZ(0);
    }
}

.black-bg .white-bg {
    display: block;
}

.address-check {
    margin-top: 51px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 18px;

    height: 60px;

    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    text-align: center;

    color: #241E17;
}

.address-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0px;
    margin: 24px 24px 30px 24px;

    height: 78px;
}

.buildingName {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 21.33px;
    line-height: 30px;

    color: #391A15;
}

.roadAddress {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;

    color: #391A15;
}

.jibunAddress {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;

    color: #828282;
}

.estimate-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0px 24px 0px 24px;
    gap: 8px;
    height: 58px;

    background: #FEE500;
    border-radius: 8px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 1px;

    color: #000000;
}

.kakao-map {
    height: 450px;
}
</style>
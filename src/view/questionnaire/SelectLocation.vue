<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <div class="title">
            <div>어느 동네 매장을</div>
            <div>알아봐 드릴까요?</div>
        </div>

        <div class="sub-title">
            현재는 베타서비스 중이라<br>
            아래 5개 구만 선택이 가능해요!
        </div>

        <div style="position: relative;">

            <div class="selected" @click="onToggle">
                <span v-if="selectedArea == '동네 선택하기'" style="color: #AEAEAE; font-weight: 400;">{{ selectedArea }}</span>
                <span v-else>{{ selectedArea }}</span>
                <img style="width: 22px; height: 22px;" :src=arrowIcon>
            </div>


            <div class="options-container">

                <div class="option" v-for="area in areaList">
                    <input type="radio" class="radio" @click="selectArea(selectedArea)" :id=area :value=area
                        v-model="selectedArea" />
                    <label class="option-label" :id=area :for=area>{{ area }}</label>
                </div>

            </div>


            <div class="phone-number-box" v-if="selectedArea != '동네 선택하기'">
                <div class="title">
                    <div>견적 전달을 위해</div>
                    <div>핸드폰 번호가 필요해요</div>
                </div>

                <input class="phone-number" type="tel" placeholder="번호를 정확하게 입력해주세요" v-model="phoneNumber"
                    @input="inputPhoneNumber(phoneNumber)" maxlength="13" />

                <div class="sub-title" v-if="phoneNumber.length == 13">
                    알림톡 발송을 위한 핸드폰 번호 수집에<br>
                    동의하시면 아래 버튼을 눌러주세요
                </div>
            </div>

            <div v-if="phoneNumber == '' || phoneNumber.length != 13" class="estimate-btn" style="background: #E1E1E1;">
                알림톡으로 견적받기</div>
            <div v-if="phoneNumber != '' && phoneNumber.length == 13 && estimateLoading == false" @click="onEstimate"
                class="estimate-btn">알림톡으로 견적받기</div>
            <div v-if="phoneNumber != '' && phoneNumber.length == 13 && estimateLoading == true" class="estimate-btn">
                <img class="loading-icon" src="/images/search_loading_icon.gif">
            </div>
        </div>
    </div>
</template>
    
<script>
import apiQuestionnaire from '@/api/questionnaire';
import cookie from '@/utils/cookie';

export default {
    data() {
        return {
            areaList: ["강동구", "광진구", "금천구", "성동구", "송파구"],
            selectedArea: "동네 선택하기",
            arrowIcon: "/images/arrow_down.svg",
            phoneNumber: '',
            estimateLoading: false,

            address: null,
            sido: null,
            sigungu: null,

            buildingName: "",
            roadAddress: "",
            jibunAddress: "",

            getCurrentPositionLoding: false,
            estimateLoading: false,
        }
    },

    methods: {
        onBackBtn() {
            this.$router.go(-1);
        },

        onToggle() {
            const optionsContainer = document.querySelector(".options-container");
            optionsContainer.classList.toggle("active");

            if (this.arrowIcon.includes("arrow_down"))
                this.arrowIcon = "/images/arrow_up.svg"
            else this.arrowIcon = "/images/arrow_down.svg"
        },

        selectArea(selectedArea) {
            const optionsContainer = document.querySelector(".options-container");
            optionsContainer.classList.remove("active");

            this.selectedArea = selectedArea
            this.arrowIcon = "/images/arrow_down.svg"
        },

        inputPhoneNumber(val) {
            var number = val.replace(/[^0-9]/g, '');
            var phone = "";

            if (number.length < 4) {
                phone = number
            } else if (number.length < 7) {
                phone += number.substr(0, 3);
                phone += "-";
                phone += number.substr(3);
            } else if (number.length < 10) {
                phone += number.substr(0, 3);
                phone += "-";
                phone += number.substr(3, 3);
                phone += "-";
                phone += number.substr(6);
            } else {
                phone += number.substr(0, 3);
                phone += "-";
                phone += number.substr(3, 4);
                phone += "-";
                phone += number.substr(7);
            }

            this.phoneNumber = phone;
            return
        },

        onEstimate() {
            this.estimateLoading = true

            let findArea = "서울시 " + this.selectedArea
            const params = {
                useTelecomIdx: parseInt(this.$route.params.useTelecomIdx),
                usePeriodIdx: parseInt(this.$route.params.usePeriodIdx),
                deviceIdx: parseInt(this.$route.params.deviceIdx),
                monthCost: parseInt(this.$route.params.monthCost),
                phoneNumber: this.phoneNumber,
                findArea: encodeURIComponent(findArea),
                findType: this.$route.params.findType
            }

            this.postSurvey(params)
        },

        postSurvey(params) {
            var findType = params.findType

            // 원하는 기기 있는 경우
            if (findType == "1") {
                apiQuestionnaire.postSurveyDeviceComplete(params)
                    .then(response => {
                        if (response.data.resultCode === 0) {
                            var enmemberidx = response.data.Enmemberidx
                            cookie.setCookie('Enmemberidx', enmemberidx, 1)
                            this.estimateLoading = false
                            window.open("https://pf.kakao.com/_wYqxexj/chat", "_blank");
                        } else {
                            console.log("실패")
                        }
                    }).catch(e => {
                        // 예외사항 체크
                        console.log(e)
                    });
            }

            // 원하는 기기 없는 경우
            if (findType == "0") {
                apiQuestionnaire.postSurveyCostComplete(params)
                    .then(response => {
                        if (response.data.resultCode === 0) {
                            var enmemberidx = response.data.Enmemberidx
                            cookie.setCookie('Enmemberidx', enmemberidx, 1)
                            this.estimateLoading = false
                            window.open("https://pf.kakao.com/_wYqxexj/chat", "_blank");
                        } else {
                            console.log("실패")
                        }
                    }).catch(e => {
                        // 예외사항 체크
                        console.log(e)
                    });
            }
        },
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
    font-style: normal;
    font-weight: 700;
    font-size: 28.43px;
    line-height: 38px;
    color: #391A15;

    margin-bottom: 24px;
}

.sub-title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #AEAEAE;

    margin-bottom: 30px;
}

.selected {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 12px;
    padding-right: 12px;
    height: 54px;
    gap: 8px;

    font-weight: 600;
    border: 1px solid #AEAEAE;
    border-radius: 8px;
    position: relative;

    cursor: pointer;
    margin-bottom: 58px;
}

.options-container {
    position: absolute;
    top: 58px;

    max-height: 0px;
    width: 100%;
    max-width: 475px;

    opacity: 0;
    transition: all 0.4s;
    border-radius: 8px;
    overflow: hidden;

    background-color: white;
    box-shadow: 1px 0px 12px rgba(48, 48, 48, 0.1);
    z-index: 2;
}

.options-container.active {
    max-height: 340px;
    opacity: 1;
}

.option-label {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-left: 20px;
    height: 54px;
    cursor: pointer;
}

.option:hover {
    background: #F7F7F7;
    font-weight: 600;
}

.option .radio {
    display: none;
}

.phone-number-box {
    position: relative;
    z-index: 1;
}

.phone-number {
    display: flex;
    align-items: center;
    padding: 18px 0px 18px 12px;

    height: 22px;
    width: calc(100% - 12px);
    background: #F7F7F7;
    border-radius: 8px;
    border: 0px;

    margin-bottom: 23px;

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;

    color: black;
}

.estimate-btn {
    position: relative;
    bottom: 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 58px;
    background: #391A15;
    border-radius: 8px;

    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: #FFFFFF;

    margin-bottom: 70px;
}

.loading-icon {
    width: 40px;
    height: 40px;
}
</style>
<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <div class="title">
            <div>어떤 핸드폰으로</div>
            <div>바꾸고 싶으세요?</div>
        </div>

        <div class="radio-box">

            <div class="model-radio-box">
                <div v-for="model in evneList()">
                    <input type="radio" :id="model.deviceName" v-model="check" :value="model.deviceIdx" class="model-radio"
                        @click="onCheck">
                    <label :for="model.deviceName">
                        <div class="model-select-btn">
                            <img class="model-check-icon" src="/images/unfilled_check.png">
                            <img class="sample-model-img" :src="model.deviceImgUrl">
                            <div class="model-name">{{ model.deviceName }}</div>
                        </div>
                    </label>
                </div>
            </div>

            <div class="model-radio-box">
                <div v-for="model in oddList()">
                    <input type="radio" :id="model.deviceName" v-model="check" :value="model.deviceIdx" class="model-radio"
                        @click="onCheck">
                    <label :for="model.deviceName">
                        <div class="model-select-btn">
                            <img class="model-check-icon" src="/images/unfilled_check.png">
                            <img class="sample-model-img" :src="model.deviceImgUrl">
                            <div class="model-name">{{ model.deviceName }}</div>
                        </div>
                    </label>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
import apiQuestionnaire from '@/api/questionnaire';

export default {
    data() {
        return {
            check: null,
            deviceModels: []
        }
    },

    mounted() {
        this.check = JSON.parse(localStorage.getItem('selectedModel')).value
        this.getDiviceModels()
    },

    methods: {
        onBackBtn() {
            this.$router.go(-1);
        },

        onCheck(ref) {
            localStorage.setItem('selectedModel', JSON.stringify(
                { name: ref.target.id, value: ref.target.value })
            );
            this.$router.push("/questionnaire/selectMobileCarrier");
        },

        getDiviceModels() {
            apiQuestionnaire.getDeviceModels()
                .then(response => {
                    this.deviceModels = response.data.device.list
                })
                .catch(e => {
                    console.log(e)
                });
        },

        // v-for 에서 2 step 기능 지원 안되서... 
        evneList() {
            var list = [];
            this.deviceModels.map((item, index) => {
                if (index % 2 == 0) list.push(item);
            });
            return list
        },

        oddList() {
            var list = [];
            this.deviceModels.map((item, index) => {
                if (index % 2 == 1) list.push(item);
            });
            return list
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
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 28.43px;
    line-height: 38px;
    color: #391A15;

    margin-bottom: 76px;
}

.radio-box {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
}

.model-radio-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    padding: 0px;
    gap: 18px;
    width: 100%;
}

.model-select-btn {
    position: relative;
    width: 154.5px;
    height: 154.5px;

    /* White */

    background: #FFFFFF;
    /* Shadow 01 */

    box-shadow: 1px 0px 12px rgba(48, 48, 48, 0.1);
    border-radius: 8px;
}

.model-check-icon {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 118.5px;
    top: 12px;
}

.sample-model-img {
    position: absolute;
    height: 117px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.model-name {
    position: absolute;
    height: 22px;
    width: 100%;
    bottom: 0%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;

    align-items: center;
    text-align: center;

    color: #241E17;
}

.model-radio {
    margin: 0px;
    display: none;
}

.model-radio:hover+label .model-check-icon {
    content: url("../../../public/images/filled_check.png")
}

.model-radio:checked+label .model-check-icon {
    content: url("../../../public/images/filled_check.png")
}
</style>
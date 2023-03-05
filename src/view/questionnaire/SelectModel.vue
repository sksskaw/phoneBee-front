<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <div class="title">
            <div>어떤 핸드폰으로</div>
            <div>바꾸고 싶으세요?</div>
        </div>

        <div class="model-radio-box">
            <input type="radio" id="0" v-model="check" value="0" class="model-radio" @click="onCheck">
            <label for="0">
                <div class="model-select-btn">
                    <img class="model-check-icon" src="/images/unfilled_check.png">
                    <img class="sample-model-img" src="/images/sample_model.png">
                    <div class="model-name">sample 1</div>
                </div>
            </label>

            <input type="radio" id="1" v-model="check" value="1" class="model-radio" @click="onCheck">
            <label for="1">
                <div class="model-select-btn">
                    <img class="sample-model-img" src="/images/sample_model.png">
                    <img class="model-check-icon" src="/images/unfilled_check.png">
                    <div class="model-name">sample 2</div>
                </div>
            </label>
        </div>

        <div style="height: 18px;"></div>

        <div class="model-radio-box">
            <input type="radio" id="3" v-model="check" value="3" class="model-radio" @click="onCheck">
            <label for="3">
                <div class="model-select-btn">
                    <img class="model-check-icon" src="/images/unfilled_check.png">
                    <img class="sample-model-img" src="/images/sample_model.png">
                    <div class="model-name">sample 3</div>
                </div>
            </label>

            <input type="radio" id="4" v-model="check" value="4" class="model-radio" @click="onCheck">
            <label for="4">
                <div class="model-select-btn">
                    <img class="sample-model-img" src="/images/sample_model.png">
                    <img class="model-check-icon" src="/images/unfilled_check.png">
                    <div class="model-name">sample 4</div>
                </div>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            check: null,
        }
    },

    mounted() {
        this.check = localStorage.getItem('selectedModel')
    },

    methods: {
        onBackBtn() {
            this.$router.go(-1);
        },

        onCheck(ref) {
            localStorage.setItem('selectedModel', ref.target.id);
            this.$router.push("/questionnaire/selectMobileCarrier");
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

.model-radio-box {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    padding: 0px;

    height: 154.5px;
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
    width: 154px;
    height: 117px;
    left: 0px;
    top: 8px;
}

.model-name {
    position: absolute;
    width: 72px;
    height: 22px;
    left: 42px;
    top: 121px;

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
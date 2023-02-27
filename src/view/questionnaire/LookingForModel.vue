<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <div class="title">
            <div>찾고 계신 핸드폰</div>
            <div>모델이 있나요?</div>
        </div>

        <div>
            <input type="radio" id="y" v-model="check" value="1" class="radio" @change="onCheck">
            <label for="y">
                <div class="select-btn">네
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="n" v-model="check" value="0" class="radio" @change="onCheck">
            <label for="n">
                <div class="select-btn">아니요
                    <img class="check-icon" src="/images/unfilled_check.png">
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

    methods: {
        onBackBtn() {
            this.$router.go(-1);
        },

        onCheck() {
            if (this.check === "1") {
                this.$router.push("/questionnaire/selectModel");
                return
            }

            this.$router.push("/questionnaire/selectMobileCarrier");
        },
    }
}
</script>

<style>
.back-btn-box {
    align-items: flex-start;
    padding: 0px;

    width: 100%;
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

.select-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    padding: 14px 20px 14px 20px;
    gap: 4px;

    background: #F7F7F7;
    border-radius: 8px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 21.33px;
    line-height: 30px;

    text-align: center;
    color: #391A15;

    cursor: pointer;
}

.check-icon {
    width: 28px;
    height: 28px;
}

.radio {
    -webkit-appearance: none;
}

.radio:hover+label img {
    content: url("../../../public/images/filled_check.png")
}
</style>
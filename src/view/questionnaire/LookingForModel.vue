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
            <input type="radio" id="y" v-model="check" value="1" class="radio" @click="onCheck">
            <label for="y">
                <div class="select-btn">네
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="n" v-model="check" value="0" class="radio" @click="onCheck">
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

    mounted() {
        this.check = localStorage.getItem('lookingForModelCheck')
    },

    methods: {
        onBackBtn() {
            this.$router.go(-1);
        },

        onCheck(ref) {
            if (ref.target.id === "y") {
                localStorage.setItem('lookingForModelCheck', "1");
                this.$router.push("/questionnaire/selectModel");
                return
            }

            localStorage.setItem('lookingForModelCheck', "0");
            this.$router.push("/questionnaire/selectMobileCarrier");
        },
    }
}
</script>

<style scoped>
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
</style>
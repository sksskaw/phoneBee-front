<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <div class="title">
            <div>핸드폰 요금은 한달에</div>
            <div>얼마정도 내고 계시나요?</div>
        </div>

        <div>
            <input type="radio" id="1" v-model="check" value="1" class="radio" @click="onCheck">
            <label for="1">
                <div class="select-btn">5만원대 이하
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="2" v-model="check" value="2" class="radio" @click="onCheck">
            <label for="2">
                <div class="select-btn">6만원대
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="3" v-model="check" value="3" class="radio" @click="onCheck">
            <label for="3">
                <div class="select-btn">7만원대
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="4" v-model="check" value="4" class="radio" @click="onCheck">
            <label for="4">
                <div class="select-btn">8만원대
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="5" v-model="check" value="5" class="radio" @click="onCheck">
            <label for="5">
                <div class="select-btn">9만원대 이상
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
        this.check = localStorage.getItem('selectBillPaid')
    },

    methods: {
        onBackBtn() {
            this.$router.go(-1);
        },

        onCheck(ref) {
            localStorage.setItem('selectBillPaid', ref.target.id);
            this.$router.push("/questionnaire/selectLocation");
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
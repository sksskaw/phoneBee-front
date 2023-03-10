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
            <input type="radio" id="5만원대" v-model="check" value="5" class="radio" @click="onCheck">
            <label for="5만원대">
                <div class="select-btn">5만원대 이하
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="6만원대" v-model="check" value="6" class="radio" @click="onCheck">
            <label for="6만원대">
                <div class="select-btn">6만원대
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="7만원대" v-model="check" value="7" class="radio" @click="onCheck">
            <label for="7만원대">
                <div class="select-btn">7만원대
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="8만원대" v-model="check" value="8" class="radio" @click="onCheck">
            <label for="8만원대">
                <div class="select-btn">8만원대
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="9만원대" v-model="check" value="9" class="radio" @click="onCheck">
            <label for="9만원대">
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
        this.check = JSON.parse(localStorage.getItem('selectBillPaid'))?.value
    },

    methods: {
        onBackBtn() {
            this.$router.push("/questionnaire/selectUsagePeriod");
        },

        onCheck(ref) {
            localStorage.setItem('selectBillPaid', JSON.stringify(
                { name: ref.target.id, value: ref.target.value })
            );
            this.$router.push("/questionnaire/selectLocation");
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
</style>
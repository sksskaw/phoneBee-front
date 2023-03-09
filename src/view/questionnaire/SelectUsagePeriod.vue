<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <div class="title">
            <div>핸드폰을 바꾸신지</div>
            <div>얼마나 되셨나요?</div>
        </div>

        <div>
            <input type="radio" id="1년" v-model="check" value="0" class="radio" @click="onCheck">
            <label for="1년">
                <div class="select-btn">1년도 안된 것 같아요.
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="1년이상" v-model="check" value="1" class="radio" @click="onCheck">
            <label for="1년이상">
                <div class="select-btn">1년은 넘었어요.
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="2년이상" v-model="check" value="2" class="radio" @click="onCheck">
            <label for="2년이상">
                <div class="select-btn">2년도 넘었어요.
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
        this.check = localStorage.getItem('selectedUsagePeriod')
    },

    methods: {
        onBackBtn() {
            this.$router.go(-1);
        },

        onCheck(ref) {
            localStorage.setItem('selectedUsagePeriod', JSON.stringify(
                { name: ref.target.id, value: ref.target.value })
            );

            if (localStorage.getItem('lookingForModelCheck') === '1') {
                this.$router.push("/questionnaire/selectLocation");
            } else {
                this.$router.push("/questionnaire/selectBillPaid");
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
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 28.43px;
    line-height: 38px;
    color: #391A15;

    margin-bottom: 76px;
}
</style>
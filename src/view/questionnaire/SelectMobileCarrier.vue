<template>
    <div class="router-div">
        <div class="back-btn-box">
            <img class="back-btn" src="/images/arrow.png" @click="onBackBtn">
        </div>

        <div class="title">
            <div>현재 사용하고 있는</div>
            <div>통신사는 무엇인가요?</div>
        </div>

        <div>
            <input type="radio" id="1" v-model="check" value="1" class="radio" @click="onCheck">
            <label for="1">
                <div class="select-btn">SKT
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="3" v-model="check" value="3" class="radio" @click="onCheck">
            <label for="3">
                <div class="select-btn">LG U+
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="2" v-model="check" value="2" class="radio" @click="onCheck">
            <label for="2">
                <div class="select-btn">KT
                    <img class="check-icon" src="/images/unfilled_check.png">
                </div>
            </label>

            <input type="radio" id="4" v-model="check" value="4" class="radio" @click="onCheck">
            <label for="4">
                <div class="select-btn">알뜰폰
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
        this.check = this.$route.params.useTelecomIdx
    },

    methods: {
        onBackBtn() {
            this.$router.go(-1);
        },

        onCheck(ref) {
            if (this.$route.params.findType == "0") {
                this.$router.replace(`/questionnaire/${this.$route.params.findType}/0/${ref.target.id}`)
                    .then(() => {
                        this.$router.push(`/questionnaire/${this.$route.params.findType}/0/${ref.target.id}/selectUsagePeriod`);
                    });
            }

            if (this.$route.params.findType == "1") {
                this.$router.replace(`/questionnaire/${this.$route.params.findType}/${this.$route.params.deviceIdx}/${ref.target.id}`)
                    .then(() => {
                        this.$router.push(`/questionnaire/${this.$route.params.findType}/${this.$route.params.deviceIdx}/${ref.target.id}/selectUsagePeriod`);
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

    margin-bottom: 76px;
}
</style>
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

        <div class="current-location-btn">
            <img class="target-icon" src="/images/target_icon.png">현재 위치로 검색
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            address: null
        }
    },

    methods: {
        onBackBtn() {
            this.$router.go(-1);
        },

        searchAddress() {
            new daum.Postcode({
                oncomplete: (data) => {
                    this.address = data.address;
                }
            }).open();
        }
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
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 18px 20px;
    gap: 10px;

    height: 50px;

    border: 1px solid #AEAEAE;
    border-radius: 8px;

    cursor: pointer;
}

.target-icon {
    width: 24px;
    height: 24px;
}
</style>
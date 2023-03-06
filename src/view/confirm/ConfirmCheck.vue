<template>
    <div class="router-div">
        <div class="close-btn-box">
            <img class="back-btn" src="/images/close.svg" @click="onBackBtn">
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },

    methods: {
        onBackBtn() {
            this.$router.go(-1);
        },
    }
}
</script>

<style scoped></style>
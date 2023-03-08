<template>
    <div class="graph-box">
        <div class="x-title">할부원금</div>
        <div class="y-title">정책</div>
        <div class="graph">
            <div class="bar-frame">
                <div class="bar" v-for="value, index in data" :style="{
                    height: `${getHeight(value) * 140}px`,
                    background: `${getBackground(index)}`
                }">
                    <div class="bar-value">{{ priceFormat(value) }}원</div>

                    <img v-if="index == 1"
                    style="margin-top: 4px; width: 36px; height: 14.4;" src="/images/skt_logo.svg">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import strg from "@/utils/strg";

export default {
    data() {
        return {
            data: [160000, 189134, 199134, 200000, 210000]
        }
    },

    methods: {
        priceFormat(value) {
            return strg.priceFormat(value)
        },

        getHeight(value) {
            let maxValue = Math.max(...this.data)
            let rate = (value / maxValue)
            return rate
        },

        getBackground(index) {
            if(index == 1) return "#FFD340"
        },
    }
}
</script>
  
<style scoped>
.graph-box {
    position: absolute;
    height: 219px;
    width: 327px;

    background-color: rgba(255, 246, 217, 0.5);
    border-radius: 16px;
}

.y-title {
    position: absolute;
    left: 3.67%;
    right: 89.91%;
    top: 5.48%;
    bottom: 86.3%;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    text-align: right;
    color: #828282;
}

.x-title {
    position: absolute;
    left: 83.49%;
    right: 3.67%;
    top: 88.58%;
    bottom: 3.2%;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    text-align: right;

    color: #828282;
}

.graph {
    position: absolute;
    left: 6.73%;
    right: 4.28%;
    top: 15.53%;
    bottom: 15.07%;

    border-left: 1px solid #AEAEAE;
    border-bottom: 1px solid #AEAEAE;
}

.bar-frame {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 0px;
    gap: 20px;

    position: absolute;
    bottom: 0px;
    margin-left: 15px;
    margin-bottom: 8px;
}

.bar {
    position: relative;
    width: 36px;

    background: #E8E8E8;
    border-radius: 4px;
}

.bar-value {
    position: absolute;
    bottom: 100%;
    left: -5px;

    width: max-content;
    height: 18px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;

    text-align: center;
    letter-spacing: -0.02em;
    color: #828282;
}
</style>
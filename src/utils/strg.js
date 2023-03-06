export default {
    priceFormat(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    getCurrentMonthAndDate() {
        var today = new Date()
        return ("0" + (today.getMonth()+1) ).slice(-2) + "월 " + ("0" + today.getDate()).slice(-2) + "일"
    }
};

export default {
    priceFormat(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    getCurrentMonthAndDate() {
        var today = new Date()
        return ("0" + (today.getMonth() + 1)).slice(-2) + "월 " + ("0" + today.getDate()).slice(-2) + "일"
    },

    getCarrierLogo(name) {
        if (name == 'SKT') return "/images/skt_logo.svg"
        if (name == 'LGU+') return "/images/lgu+_logo.svg"
        if (name == 'KT') return "/images/kt_logo.svg"
    },
};
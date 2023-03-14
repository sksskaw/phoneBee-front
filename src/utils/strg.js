export default {
    priceFormat(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    getCurrentMonthAndDate() {
        var today = new Date()
        return ("0" + (today.getMonth() + 1)).slice(-2) + "월 " + ("0" + today.getDate()).slice(-2) + "일"
    },

    getCarrierLogo(name) {
        if (name == 'SKT') return "/images/skt_logo.png"
        if (name == 'LGU+') return "/images/lgu+_logo.png"
        if (name == 'KT') return "/images/kt_logo.png"
    },

    getCarrierLogoSmallStyle(name) {
        if (name == 'SKT') return "width: 60px; height: 24px;"
        if (name == 'LGU+') return "width: 48.3px; height: 13.8px;"
        if (name == 'KT') return "width: 31.2px; height: 13.2px;"
    },
};
import rest from "@/utils/rest";

export default {
    async getEstimateList(surveyCode, enmemberidx) {
        return new Promise((resolve, reject) => {
            rest.get(`/api/survey/estimate/list/${surveyCode}?Enmemberidx=${enmemberidx}`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    async getEstimateCheck(surveyCode, enmemberidx) {
        return new Promise((resolve, reject) => {
            rest.get(`/api/survey/estimate/check/${surveyCode}?Enmemberidx=${enmemberidx}`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    async getEstimateDetail(surveyCode, planPriceIdx, enmemberidx) {
        return new Promise((resolve, reject) => {
            rest.get(`/api/estimate/detail/${surveyCode}/${planPriceIdx}?Enmemberidx=${enmemberidx}`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    async postEstimateComplete(surveyCode, planPriceIdx, enmemberidx) {
        return new Promise((resolve, reject) => {
            rest.post(`/api/estimate/complete/${surveyCode}/${planPriceIdx}`, null,
                {
                    params: {
                        'Enmemberidx': enmemberidx
                    }
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    async getEstimateConfirm(estimateCode, enmemberidx) {
        return new Promise((resolve, reject) => {
            rest.get(`/api/estimate/confirm/${estimateCode}?Enmemberidx=${enmemberidx}`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    async postReservationComplete(estimateCode, params, enmemberidx) {
        return new Promise((resolve, reject) => {
            rest.post(`/api/reservation/complete/${estimateCode}`, null,
                {
                    params: {
                        'Enmemberidx': enmemberidx,
                        'reservationDate': params.reservationDate,
                        'reservationTime': params.reservationTime,
                    }
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    async getReservationConfirm(reservationCode, enmemberidx) {
        return new Promise((resolve, reject) => {
            rest.get(`/api/reservation/confirm/${reservationCode}?Enmemberidx=${enmemberidx}`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
}
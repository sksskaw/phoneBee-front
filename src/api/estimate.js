import rest from "@/utils/rest";

export default {
    async getEstimateList(surveyCode, enmemberidx) {
        return new Promise((resolve, reject) => {
            rest.get(`/api/survey/estimate/list/${surveyCode}`
                , {
                    headers: {
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

    async getEstimateCheck(surveyCode, enmemberidx) {
        return new Promise((resolve, reject) => {
            rest.get(`/api/survey/estimate/check/${surveyCode}`
                , {
                    headers: {
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

    async getEstimateDetail(surveyCode, planPriceIdx, enmemberidx) {
        return new Promise((resolve, reject) => {
            rest.get(`/api/estimate/detail/${surveyCode}/${planPriceIdx}`
                , {
                    headers: {
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
}
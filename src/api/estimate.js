import rest from "@/utils/rest";

export default {
    async getEstimateList(surveyCode) {
        return new Promise((resolve, reject) => {
            rest.get(`/api/survey/estimate/list/${surveyCode}`
                , {
                    headers: {
                        'Enmemberidx': 'SXlTSHdxQnZrS2pKTkRUYm5FMU15UT09'
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

    async getEstimateList(surveyCode) {
        return new Promise((resolve, reject) => {
            rest.get(`/api/survey/estimate/list/${surveyCode}`
                , {
                    headers: {
                        'Enmemberidx': 'SXlTSHdxQnZrS2pKTkRUYm5FMU15UT09'
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
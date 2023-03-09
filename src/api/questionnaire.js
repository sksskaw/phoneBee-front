import rest from "@/utils/rest";

export default {
    async getDeviceModels() {
        return new Promise((resolve, reject) => {
            rest.get("/api/device/list/0/100")
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    async postSurveyDeviceComplete(params) {
        return new Promise((resolve, reject) => {
            rest.post("/api/survey/device/complete", params)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    async postSurveyCostComplete(params) {
        return new Promise((resolve, reject) => {
            rest.post("/api/survey/cost/complete", params)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
}
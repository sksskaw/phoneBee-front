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

    async postSurveyDeviceComplete(params, enmemberidx) {
        return new Promise((resolve, reject) => {
            rest.post("/api/survey/device/complete",null,
                {
                    headers: {
                        'Enmemberidx': enmemberidx
                    },
                    params : {
                        'useTelecomIdx' : params.useTelecomIdx,
                        'usePeriodIdx' : params.usePeriodIdx,
                        'deviceIdx' : params.deviceIdx,
                        'findArea' : params.findArea
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

    async postSurveyCostComplete(params, enmemberidx) {
        return new Promise((resolve, reject) => {
            rest.post("/api/survey/cost/complete?",null,
                {
                    headers: {
                        'Enmemberidx': enmemberidx
                    },
                    params : {
                        'useTelecomIdx' : params.useTelecomIdx,
                        'usePeriodIdx' : params.usePeriodIdx,
                        'monthCost' : params.monthCost,
                        'findArea' : params.findArea
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
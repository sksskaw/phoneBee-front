import rest from "@/utils/rest";

export default {
    async sighUpLogin(params) {
        return new Promise((resolve, reject) => {
            rest.post("/login/outh/kakao?", {
                params: params
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
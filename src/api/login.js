import rest from "@/utils/rest";

export default {
    async sighUpLogin(params) {
        return new Promise((resolve, reject) => {
            rest.post("/api/login/outh/kakao?"+
                `kakaoId=${params.kakaoId}&`+
                `accessToken=${params.accessToken}&`+
                `refreshToken=${params.refreshToken}&`+
                `expiresIn=${params.expiresIn}&`+
                `nickname=${params.nickname}&`+
                `email=${params.email}&`+
                `phoneNumber=${params.phoneNumber}&`+
                `thumbnailImageUrl=${params.thumbnailImageUrl}`
            )
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
}
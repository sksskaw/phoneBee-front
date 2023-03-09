<template>
    <div></div>
</template>

<script>
import apiKakao from '@/api/kakao';
import apiLogin from '@/api/login';

export default {
    data() {
        return {
            kakaoAuth: {},
            kakaoUserInfo: {},
        }
    },

    mounted() {
        const code = new URLSearchParams(location.search).get('code');
        apiKakao.getKakaoAccessToken(code)
            .then(response => {
                this.kakaoAuth = response.data

                apiKakao.getKakaoUserInfo(this.kakaoAuth.access_token)
                    .then(response => {
                        this.kakaoUserInfo = response.data
                        this.signUpLogin()
                    })
                    .catch(e => {
                        console.log(e)
                    });
            })
            .catch(e => {
                console.log(e)
            });
    },

    methods: {
        signUpLogin() {
            const param = {
                kakaoId: this.kakaoUserInfo.id,
                accessToken: this.kakaoAuth.access_token,
                refreshToken: this.kakaoAuth.refresh_token,
                expiresIn: this.kakaoAuth.expires_in,
                nickname: this.kakaoUserInfo.properties.nickname,
                email: this.kakaoUserInfo.kakao_account.email,
                phoneNumber: this.kakaoUserInfo.kakao_account.phone_number,
                thumbnailImageUrl: this.kakaoUserInfo.properties.profile_image,
            }
            apiLogin.sighUpLogin(param)
                .then(response => {
                    console.log(response.data.Enmemberidx)
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }
}
</script>
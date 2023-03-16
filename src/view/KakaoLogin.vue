<template>
    <div>
        <div class="close-btn-box">
            <div class="back-btn" @click="onBackBtn">&lt;</div>
            <div>로그인</div>
            <div style="width: 24px; height: 24px;"></div>
        </div>

        <div class="login-btn" v-if="loading == false" @click="onLogin">
            <img class="loading-icon" src="/images/kakao_login.png">
        </div>

        <div class="login-loading-btn" v-if="loading == true">
            <img style="width: 30px; height: 30px;" class="loading-icon" src="/images/search_loading_icon.gif">
        </div>
    </div>

    <div class="footer-wrap">
        <Footer> </Footer>
    </div>
</template>

<script>
import Footer from '@/components/MainFooter.vue';
import apiLogin from '@/api/login';
import cookie from '@/utils/cookie';

export default {
    components: {
        Footer
    },

    data() {
        return {
            loading: false,
        }
    },

    methods: {
        onBackBtn() {
            this.$router.push("/");
        },

        onLogin() {
            this.loading = true
            window.Kakao.Auth.login({
                success: this.getKakaoMyInfo
            })
        },

        getKakaoMyInfo(authObj) {
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: res => {
                    const kakao_account = res.kakao_account;
                    const userInfo = {
                        kakaoId: res.id,
                        accessToken: authObj.access_token,
                        refreshToken: authObj.refresh_token,
                        expiresIn: authObj.expires_in,
                        nickname: kakao_account.profile.nickname,
                        email: kakao_account.email,
                        phoneNumber: kakao_account.phone_number,
                        thumbnailImageUrl: kakao_account.profile.thumbnail_image_url

                    }

                    apiLogin.sighUpLogin(userInfo)
                        .then(response => {
                            // response.resultCode === 0 인 경우..
                            if (response.data.resultCode === 0) {
                                var enmemberidx = response.data.Enmemberidx
                                cookie.setCookie('Enmemberidx', enmemberidx, 1)
                                this.$router.go(-1);
                            } else {
                                console.log("response.data.resultCode === 0 이 아닌 경우에 대한 예외 처리")
                            }
                        })
                        .catch(e => {
                            // 예외사항 체크
                            console.log(e)
                        });
                },
                fail: error => {
                    console.log(error);
                }
            })
        },
    }
}
</script>
  
<style scoped>
.close-btn-box {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    width: 100%;

    margin-bottom: 26px;

    color: white;
    background-color: black;
}

.back-btn {
    width: 24px;
    height: 24px;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    align-items: center;
}

.login-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 26px;
}

.login-loading-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 26px;

    max-width: 300px;
    height: 45px;

    background: #FEE500;
    border-radius: 8px;

    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 1px;

    color: #000000;
}
</style>
import axios from 'axios';

export default {
    async getKakaoAccessToken(code) {
        return await axios.post('https://kauth.kakao.com/oauth/token',
            new URLSearchParams({
                'grant_type': 'authorization_code',
                'client_id': process.env.VUE_APP_KAKAO_KEY,
                'redirect_uri': window.location.origin + '/kakao/auto',
                'code': code
            }), {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
    },

    async getKakaoUserInfo(token) {
        return await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }
}
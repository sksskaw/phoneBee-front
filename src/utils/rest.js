import axios from "axios";

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

instance.interceptors.response.use(
    function (response) {
        if (response.data.message.strType == 'alert_and_back') {
            alert(response.data.message.strMessage)
            this.$router.go(-1);
            return
        }
        
        if (response.data.message.strType == 'alert') {
            alert(response.data.message.strMessage)
            return
        }

        if (response.data.message.strType == 'alert_and_go_login') {
            alert(response.data.message.strMessage)
            this.$router.push("/login");
            return
        }

        return response
    },
    function (error) {
        console.log(error)
    },
);

export default instance;
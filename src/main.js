import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@/styles/common.css";

import VueGtag from 'vue-gtag'

const app = createApp(App)
    .use(router)
    .use(VueGtag, {
        config: { id: "G-0ZFPY754S4" }
    })

app.mount("#app");
window.Kakao.init(process.env.VUE_APP_KAKAO_KEY)

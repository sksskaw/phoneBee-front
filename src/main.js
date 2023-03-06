import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@/styles/common.css";

import VueGtag from 'vue-gtag'

const app = createApp(App)
    .use(router)
    .use(VueGtag, {
        config: { id: "GA_MEASUREMENT_ID" }
    })

app.mount("#app");

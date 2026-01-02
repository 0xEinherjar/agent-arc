import { createApp } from "vue";
import { createPinia } from "pinia";
import { WagmiPlugin } from "@wagmi/vue";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { Buffer } from "buffer";
import "./style.css";
import App from "./App.vue";
import router from "./routes/index.js";
import AxiosHttpClient from "./infra/axios.js";
import UserGateway from "./infra/gateway/user.js";
import { config } from "./wagmi.js";

globalThis.Buffer = Buffer;

const httpClient = new AxiosHttpClient();
const userGateway = new UserGateway(httpClient, import.meta.env.VITE_BASEURL);
const queryClient = new QueryClient();
const pinia = createPinia();
const app = createApp(App);

app.provide("userGateway", userGateway);
app.use(router);
app.use(pinia);
app.use(WagmiPlugin, { config });
app.use(VueQueryPlugin, { queryClient });
app.mount("#app");

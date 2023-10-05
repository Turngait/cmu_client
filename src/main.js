import { createApp } from 'vue';
import { createI18n } from "vue-i18n";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import App from './App.vue';
import messages from "./i18n";
import store from "./store/index";
import router from "./routes";

const i18n = new createI18n({
  locale: "en",
  allowComposition: true,
  fallbackLocale: "ru",
  messages,
});

const app = createApp(App);
app.use(i18n);
app.use(store);
app.use(router);
app.use(ToastPlugin, {
  position: "top"
});

app.mount('#app');

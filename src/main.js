import { createApp } from "vue";
import "./style.css";
import { useToast } from "vue-toastification";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import store from "./store/index";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
library.add(fas, far, fab);

import App from "./App.vue";
import router from "./Route";

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(router);
let options = {
	position: "top-right",
	timeout: 4000,
	closeOnClick: false,
	pauseOnHover: true,
};
app.use(Toast, options);
app.config.globalProperties.$toast = useToast();
app.mount("#app");

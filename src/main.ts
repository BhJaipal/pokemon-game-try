import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Tres from "@tresjs/core";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: "dark",
	},
});

createApp(App).use(Tres).use(vuetify).mount("#app");

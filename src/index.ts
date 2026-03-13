import { handlebarsRegisterPartials } from "./services/handlebarsRegisterPartials/handlebarsRegisterPartials";
import "./styles/global.scss";

const app = document.querySelector("#app");

if (!app) {
    throw new Error('id app не найден');
}

app.innerHTML = "<h1>BEFORE PARTIALS</h1>";

handlebarsRegisterPartials();

app.innerHTML = "<h1>AFTER PARTIALS</h1>";
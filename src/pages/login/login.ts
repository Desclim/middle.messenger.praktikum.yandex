import Handlebars from "handlebars/dist/cjs/handlebars.js";
import template from "./login.hbs?raw";
import "./login.scss";

const compiled = Handlebars.compile(template);

export function LoginPage(): string {
    return compiled({});
}
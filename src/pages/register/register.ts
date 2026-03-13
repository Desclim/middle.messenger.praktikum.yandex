import Handlebars from "handlebars/dist/handlebars.js";
import './register.scss'
import template from "./register.hbs?raw";

const complied = Handlebars.compile(template)

export function RegisterPage() {
    return complied({})
}
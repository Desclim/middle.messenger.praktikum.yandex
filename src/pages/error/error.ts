import Handlebars from "handlebars/dist/handlebars.js";
import template from "./error.hbs?raw";
import './error.scss'

const compiled = Handlebars.compile(template)
export function ErrorPage() {
    return compiled({})
}
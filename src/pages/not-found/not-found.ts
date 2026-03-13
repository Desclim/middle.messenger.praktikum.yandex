import Handlebars from "handlebars/dist/handlebars.js";
import template from "./not-found.hbs?raw";
import './not-found.scss'

const compiled = Handlebars.compile(template)
export function NotFoundPage() {
    return compiled({})
}
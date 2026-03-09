import * as Handlebars from 'handlebars'
import template from "./notFound.hbs?raw";
import './notFound.scss'

const compiled = Handlebars.compile(template)
export function NotFoundPage() {
    return compiled({})
}
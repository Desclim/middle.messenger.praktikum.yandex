import * as Handlebars from 'handlebars'
import template from './login.hbs?raw'
import './login.scss'

const compiled = Handlebars.compile(template);
export function LoginPage(): string {
    return compiled({});
}


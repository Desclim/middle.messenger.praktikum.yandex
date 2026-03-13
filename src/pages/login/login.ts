import Handlebars from 'handlebars';
import template from './login.hbs?raw'
import './login.scss'
export function LoginPage(): string {
    return Handlebars.compile(template)({});
}


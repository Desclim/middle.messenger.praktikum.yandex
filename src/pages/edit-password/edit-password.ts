import Handlebars from "handlebars/dist/handlebars.js";
import template from './edit-password.hbs?raw'
import './edit-password.scss'
import {mockProfile} from "../../mocks/mockProfile";
import type {ProfilePageContext} from "../../mocks/mockProfile";

const compiled = Handlebars.compile(template);
export function EditPasswordPage(): string {
    const context: ProfilePageContext = mockProfile

    return compiled(context);
}


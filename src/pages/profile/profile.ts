import Handlebars from "handlebars/dist/handlebars.js";
import template from './profile.hbs?raw'
import './profile.scss'
import type {ProfilePageContext} from "../../mocks/mockProfile";
import {mockProfile} from "../../mocks/mockProfile";

const compiled = Handlebars.compile(template);
export function ProfilePage(): string {
    const context: ProfilePageContext = mockProfile

    return compiled(context);
}


import * as Handlebars from 'handlebars'
import template from './edit-profile.hbs?raw'
import './edit-profile.scss'
import {mockProfile} from "../../mocks/mockProfile";
import type {ProfilePageContext} from "../../mocks/mockProfile";

const compiled = Handlebars.compile(template);
export function EditProfilePage(): string {
    const context: ProfilePageContext = mockProfile

    return compiled(context);
}


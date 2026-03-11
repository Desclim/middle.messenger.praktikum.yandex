import * as Handlebars from 'handlebars'
import inputTemplate from '../../blocks/input/input.hbs?raw';
import buttonTemplate from '../../blocks/button/button.hbs?raw';
import linkTemplate from '../../blocks/link/link.hbs?raw';
import searchTemplate from '../../blocks/search/search.hbs?raw';

let isRegistered:boolean = false
export function handlebarsRegisterPartials():void {
    if (isRegistered) {
        return;
    }

    Handlebars.registerPartial('input', inputTemplate)
    Handlebars.registerPartial('button', buttonTemplate)
    Handlebars.registerPartial('link', linkTemplate)
    Handlebars.registerPartial('search', searchTemplate)

    isRegistered = true
}
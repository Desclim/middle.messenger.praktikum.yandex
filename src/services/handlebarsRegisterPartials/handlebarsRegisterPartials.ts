import Handlebars from 'handlebars'
import inputTemplate from '../../components/input/input.hbs?raw';
import buttonTemplate from '../../components/button/button.hbs?raw';
import linkTemplate from '../../components/link/link.hbs?raw';
import searchTemplate from '../../components/search/search.hbs?raw';
import chatItemTemplate from '../../components/chat-item/chat-item.hbs?raw';
import postMessageTemplate from '../../components/post-message/post-message.hbs?raw';
import profileAvatarTemplate from '../../components/profile-avatar/profile-avatar.hbs?raw';
import profileBackButtonTemplate from '../../components/profile-back-button/profile-back-button.hbs?raw';

let isRegistered:boolean = false
export function handlebarsRegisterPartials():void {
    if (isRegistered) {
        return;
    }

    Handlebars.registerPartial('input', inputTemplate)
    Handlebars.registerPartial('button', buttonTemplate)
    Handlebars.registerPartial('link', linkTemplate)
    Handlebars.registerPartial('search', searchTemplate)
    Handlebars.registerPartial('chat-item', chatItemTemplate)
    Handlebars.registerPartial('post-message', postMessageTemplate)
    Handlebars.registerPartial('profile-avatar', profileAvatarTemplate)
    Handlebars.registerPartial('profile-back-button', profileBackButtonTemplate)

    isRegistered = true
}

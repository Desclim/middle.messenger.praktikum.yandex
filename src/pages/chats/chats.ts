import * as  Handlebars from 'handlebars'
import './chats.scss'
import template from "./chats.hbs?raw";

const complied = Handlebars.compile(template)

export function ChatsPage() {
    return complied({})
}
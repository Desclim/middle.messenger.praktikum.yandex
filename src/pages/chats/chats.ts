import * as  Handlebars from 'handlebars'
import './chats.scss'
import template from "./chats.hbs?raw";
import {chats} from './mock'

const complied = Handlebars.compile(template)

export function ChatsPage() {
    return complied({chats})
}
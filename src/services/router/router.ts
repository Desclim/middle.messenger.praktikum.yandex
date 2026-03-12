import {render} from "../../utils/render";
import {LoginPage} from "../../pages/login/login";
import type {Route} from "./types";
import {initLoginPage} from "../../pages/login/init";
import {NotFoundPage} from "../../pages/not-found/not-found";
import {ErrorPage} from "../../pages/error/error";
import {RegisterPage} from "../../pages/register/register";
import {initRegisterPage} from "../../pages/register/init"
import {ChatsPage} from "../../pages/chats/chats";
import {initChatsPage} from "../../pages/chats/init";
import {ProfilePage} from "../../pages/profile/profile";
import {initProfilePage} from "../../pages/profile/init";
import {EditProfilePage} from "../../pages/edit-profile/edit-profile";
import {initEditProfilePage} from "../../pages/edit-profile/init";
import {EditPasswordPage} from "../../pages/edit-password/edit-password";
import {initEditPasswordPage} from "../../pages/edit-password/init";

const routes:Record<string, Route> = {
    '/': {
        render: LoginPage,
        init: initLoginPage
    },
    '/404': {
        render: NotFoundPage
    },
    '/500': {
        render: ErrorPage
    },
    '/register': {
        render:RegisterPage,
        init:initRegisterPage
    },
    '/chats': {
        render:ChatsPage,
        init:initChatsPage
    },
    '/profile': {
        render:ProfilePage,
        init: initProfilePage,
    },
    '/edit-profile': {
        render: EditProfilePage,
        init: initEditProfilePage,
    },
    '/edit-password': {
        render: EditPasswordPage,
        init:initEditPasswordPage,
    },
};

export function router() {
    const path = window.location.pathname;
    let route:Route = routes[path];

    if (!route) {
        window.history.replaceState({}, '', '/404');
        route = routes['/404'];
    }

    if (!route) {
        return
    }

    render(route.render());
    route.init?.();
}

export function navigate(path:string) {
    window.history.pushState({}, '', path);
    router();
}
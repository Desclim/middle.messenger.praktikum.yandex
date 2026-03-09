import {render} from "../../utils/render";
import {LoginPage} from "../../pages/login/login";
import type {Route} from "./types";
import {initLoginPage} from "../../pages/login/init";
import {NotFoundPage} from "../../pages/notFound/notFound";
import {ErrorPage} from "../../pages/error/error";
import {RegisterPage} from "../../pages/register/register";
import {initRegisterPage} from "../../pages/register/init"

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
    }
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
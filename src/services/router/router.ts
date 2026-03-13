import { render } from "../../utils/render";
import { LoginPage } from "../../pages/login/login";
import type { Route } from "./types";

const routes: Record<string, Route> = {
    '/': {
        render: LoginPage,
    },
};

export function router() {
    const route = routes['/'];
    render(route.render());
}

export function navigate(path:string) {
    window.history.pushState({}, '', path);
    router();
}
import { render } from "../../utils/render";
import type { Route } from "./types";

const routes: Record<string, Route> = {
    '/': {
        render: () => '<h1>router works</h1>',
    },
};

export function router() {
    const path = window.location.pathname;
    let route: Route = routes[path];

    if (!route) {
        route = routes['/'];
    }

    if (!route) {
        return;
    }

    render(route.render());
    route.init?.();
}

export function navigate(path: string) {
    window.history.pushState({}, '', path);
    router();
}
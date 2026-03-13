import { render } from "../../utils/render";
import type { Route } from "./types";

const routes: Record<string, Route> = {
    '/': {
        render: () => '<h1>router works</h1>',
    },
};

export function router() {
    const path = window.location.pathname;
    const route: Route = routes[path] ?? routes['/'];

    render(route.render());
    route.init?.();
}

export function navigate(path: string) {
    window.history.pushState({}, '', path);
    router();
}
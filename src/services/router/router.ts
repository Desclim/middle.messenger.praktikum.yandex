import { render } from "../../utils/render";
import { LoginPage } from "../../pages/login/login";

export function router() {
    render(LoginPage());
}

export function navigate(path: string) {
    window.history.pushState({}, "", path);
    router();
}
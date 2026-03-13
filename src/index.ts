import { navigate, router } from "./services/router/router";
import "./styles/global.scss";

document.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest("[data-link]") as HTMLAnchorElement | null;

    if (!link) {
        return;
    }

    event.preventDefault();

    const href = link.getAttribute("href");

    if (!href) {
        return;
    }

    navigate(href);
});

router();
window.addEventListener("popstate", router);
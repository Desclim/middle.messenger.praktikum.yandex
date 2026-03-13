import { navigate, router } from "./services/router/router";
import { handlebarsRegisterPartials } from "./services/handlebarsRegisterPartials/handlebarsRegisterPartials";
import "./styles/global.scss";

console.log("index.ts loaded");

handlebarsRegisterPartials();
console.log("partials registered");

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

if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", () => {
        console.log("DOMContentLoaded");
        router();
    });
} else {
    console.log("document already ready");
    router();
}

window.addEventListener("popstate", () => {
    console.log("popstate");
    router();
});
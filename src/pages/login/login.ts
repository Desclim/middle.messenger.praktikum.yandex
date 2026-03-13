import Handlebars from "handlebars/dist/handlebars.js";
import template from "./login.hbs?raw";
import "./login.scss";

export function LoginPage(): string {
    try {
        const compiled = Handlebars.compile(template);
        return compiled({});
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        return `
            <pre style="padding:16px;white-space:pre-wrap;color:red;">
LOGIN TEMPLATE ERROR:
${message}
            </pre>
        `;
    }
}
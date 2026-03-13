import HandlebarsLib from "handlebars";
import template from "./login.hbs?raw";
import "./login.scss";

const Handlebars = (HandlebarsLib as any).default ?? HandlebarsLib;

export function LoginPage(): string {
    try {
        if (typeof Handlebars.compile !== "function") {
            return `
                <pre style="padding:16px;white-space:pre-wrap;color:red;">
Handlebars.compile is not a function
Type: ${typeof Handlebars.compile}
Keys: ${Object.keys(Handlebars).join(", ")}
                </pre>
            `;
        }

        const compiled = Handlebars.compile(template);
        return compiled({});
    } catch (error) {
        const message = error instanceof Error ? error.stack || error.message : String(error);

        return `
            <pre style="padding:16px;white-space:pre-wrap;color:red;">
LOGIN TEMPLATE ERROR:
${message}
            </pre>
        `;
    }
}
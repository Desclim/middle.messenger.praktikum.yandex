import template from "./login.hbs?raw";

export function LoginPage(): string {
    return `
        <pre style="padding:16px;white-space:pre-wrap;">
${template.replace(/</g, "&lt;")}
        </pre>
    `;
}
declare module '*.hbs?raw' {
    const template: string;
    export default template
}

declare module "handlebars/dist/cjs/handlebars.js" {
    import Handlebars from "handlebars";
    export default Handlebars;
}
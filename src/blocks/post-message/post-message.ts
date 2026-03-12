import type {PostMessageOptions} from "./type";

export class PostMessage {
    private root: HTMLElement;
    private form: HTMLFormElement;
    private field: HTMLInputElement;
    private onSubmit?: (value: string) => void;

    constructor(options: PostMessageOptions) {
        this.root = options.root;
        this.onSubmit = options.onSubmit;

        this.form = this.root as HTMLFormElement;
        this.field = this.root.querySelector('.post-message__field') as HTMLInputElement;

        this.bindEvents();
    }

    getValue(): string {
        return this.field.value;
    }

    clear(): void {
        this.field.value = '';
    }

    private handleSubmit = (event: Event): void => {
        event.preventDefault();

        const value = this.getValue().trim();

        if (!value) {
            return;
        }

        this.onSubmit?.(value);
        this.clear();
    };

    private bindEvents(): void {
        this.form.addEventListener('submit', this.handleSubmit);
    }
}
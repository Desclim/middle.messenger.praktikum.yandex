import type {SearchOptions} from "./types";

export class Search {
    private root: HTMLElement;
    private field: HTMLInputElement;
    private onSearch?: (value: string) => void;

    constructor(options: SearchOptions) {
        this.root = options.root;
        this.onSearch = options.onSearch;

        this.field = this.root.querySelector('.search__field') as HTMLInputElement;

        this.bindEvents();
    }

    getValue(): string {
        return this.field.value;
    }

    private updateState(): void {
        const hasValue = this.field.value.trim().length > 0;
        this.root.classList.toggle('search_filled', hasValue);
    }

    private bindEvents(): void {
        this.field.addEventListener('focus', () => {
            this.root.classList.add('search_focused');
        });

        this.field.addEventListener('blur', () => {
            this.root.classList.remove('search_focused');
            this.updateState();
        });

        this.field.addEventListener('input', () => {
            const value = this.getValue();
            this.updateState();
            this.onSearch?.(value);
        });
    }
}

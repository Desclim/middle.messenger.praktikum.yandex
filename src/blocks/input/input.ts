import type { InputOptions, MasksInput } from "./types";

function formatPhone(value: string): string {
    let digits = value.replace(/\D/g, '');

    if (!digits.length) {
        return '';
    }

    if (digits[0] === '8') {
        digits = '7' + digits.slice(1);
    }

    if (digits[0] !== '7') {
        digits = '7' + digits;
    }

    digits = digits.slice(0, 11);

    let result = '+7';

    if (digits.length > 1) {
        result += ' (' + digits.slice(1, 4);
    }

    if (digits.length >= 5) {
        result += ') ' + digits.slice(4, 7);
    }

    if (digits.length >= 8) {
        result += ' ' + digits.slice(7, 9);
    }

    if (digits.length >= 10) {
        result += ' ' + digits.slice(9, 11);
    }

    return result;
}

export class Input {
    private root: HTMLElement;
    private value: string;
    private field: HTMLInputElement;
    private mask: MasksInput
    private errorElement: HTMLElement | null;
    private validator?: (value: string) => string;

    constructor(options: InputOptions) {
        this.root = options.root;
        this.validator = options.validator;
        this.mask = options.mask as MasksInput
        this.value = options.value as string

        this.field = this.root.querySelector('.input__field') as HTMLInputElement;
        this.errorElement = this.root.querySelector('.input__error');

        this.bindEvents()
    }

    private updateState(): void {
        const isFocused = document.activeElement === this.field;
        const hasValue = this.field.value.trim().length > 0;

        this.root.classList.toggle('input_focused', isFocused);
        this.root.classList.toggle('input_filled', hasValue);
    }

    getValue(): string {
        return this.field.value;
    }

    setValue(textContent: string): void {
        this.field.value = textContent;
    }

    showError(message: string): void {
        if (this.errorElement) {
            this.errorElement.textContent = message;
        }
    }

    hideError(): void {
        if (this.errorElement) {
            this.errorElement.textContent = '';
        }
    }

    validate(): boolean {
        if (!this.validator) {
            return true;
        }

        const message = this.validator(this.getValue());

        if (message) {
            this.showError(message);
            return false;
        }

        this.hideError();
        return true;
    }

    bindEvents(): void {
        this.updateState()

        if (this.value) {
            this.setValue(this.value)
            this.updateState();
        }

        this.field.addEventListener('blur', () => {
            this.updateState();
            this.validate();
        });

        this.field.addEventListener('focus', () => {
            this.updateState();
            this.hideError();
        });

        this.field.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            if (this.mask === 'phone') {
                const digits = target.value.replace(/\D/g, '');

                if (!digits.length) {
                    target.value = '';
                } else {
                    target.value = formatPhone(target.value);
                }
            }

            this.updateState();
            this.hideError();
        });
    }
}
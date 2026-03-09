export type Validator = (value: string) => string;

export type MasksInput = 'phone'

export type InputOptions = {
    root: HTMLElement;
    validator?: Validator;
    mask?: MasksInput
};
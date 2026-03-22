export type Validator = (value: string) => string;

export type MasksInput = 'phone'

export type InputOptions = {
    root: HTMLElement;
    value?:string;
    validator?: Validator;
    mask?: MasksInput
};

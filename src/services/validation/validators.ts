export function validateDefault(value: string): string {
    if (!value.trim()) {
        return 'Заполните поле';
    }

    return '';
}

export function validateLogin(value: string): string {
    if (!value.trim()) {
        return 'Введите логин';
    }

    return '';
}

export function validatePassword(value: string): string {
    if (!value.trim()) {
        return 'Введите пароль';
    }

    return '';
}

export function validatePasswordRepeat(value: string, password: string): string {
    if (!value.trim()) {
        return 'Повторите пароль';
    }

    if (value !== password) {
        return 'Пароли не совпадают';
    }

    return '';
}
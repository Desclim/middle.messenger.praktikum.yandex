import {getValueFromMaskPhone} from "../../utils/getValueFromMaskPhone";

export function validateDefault(value: string): string {
  if (!value.trim()) {
    return 'Заполните поле';
  }

  return '';
}

export const validateName = (value: string): string => {
  if (!value.trim()) {
    return 'Поле обязательно';
  }

  if (!/^[A-ZА-ЯЁ][a-zа-яё-]*$/u.test(value.trim())) {
    return 'Первая буква должна быть заглавной, допустимы только буквы и дефис';
  }

  return '';
};

export const validateLogin = (value: string): string => {
  if (!value.trim()) {
    return 'Поле обязательно';
  }

  if (!/^[a-zA-Z0-9_-]{3,20}$/.test(value.trim())) {
    return 'Логин должен быть от 3 до 20 символов, содержать только латиницу, цифры, дефис или подчёркивание';
  }

  if (/^\d+$/.test(value.trim())) {
    return 'Логин не может состоять только из цифр';
  }

  return '';
};

export const validateEmail = (value: string): string => {
  if (!value.trim()) {
    return 'Поле обязательно';
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value.trim())) {
    return 'Некорректный email';
  }

  return '';
};

export const validatePhone = (value: string): string => {
  const correctValue: string = getValueFromMaskPhone(value)

  if (!correctValue.trim()) {
    return 'Поле обязательно';
  }
//Сделал исходя из дизайна. Российский номер телефона, где может быть только 11 цифр
  if (correctValue.length !== 11) {
    return 'Некорректный номер телефона';
  }

  return '';
};

export const validatePassword = (value: string): string => {
  if (!value.trim()) {
    return 'Поле обязательно';
  }

  if (!/^.{8,40}$/.test(value.trim())) {
    return 'Пароль должен быть от 8 до 40 символов';
  }

  if (!/[A-Z]/.test(value.trim()) || !/\d/.test(value.trim())) {
    return 'Пароль должен содержать хотя бы одну заглавную букву и цифру';
  }

  return '';
};

export function validatePasswordRepeat(value: string, password: string): string {
  if (!value.trim()) {
    return 'Повторите пароль';
  }

  if (value !== password) {
    return 'Пароли не совпадают';
  }

  return '';
}

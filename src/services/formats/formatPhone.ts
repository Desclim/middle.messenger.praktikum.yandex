export function formatPhone(value: string): string {
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
    result += ` (${digits.slice(1, 4)}`;
  }

  if (digits.length >= 5) {
    result += `) ${digits.slice(4, 7)}`;
  }

  if (digits.length >= 8) {
    result += ` ${digits.slice(7, 9)}`;
  }

  if (digits.length >= 10) {
    result += ` ${digits.slice(9, 11)}`;
  }

  return result;
}

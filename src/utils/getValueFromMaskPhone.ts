export function getValueFromMaskPhone(value: string): string {
  const result = value.replace(/\D/g, '')
  return result
}

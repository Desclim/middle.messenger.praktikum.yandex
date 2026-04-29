export function formatMessageTime(time: string): string {
  const date = new Date(time);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatMessageDate(time: string): string {
  const date = new Date(time);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
}

export function getMessageDateKey(time: string): string {
  const date = new Date(time);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ].join('-');
}

export function formatMessageFullDate(time: string): string {
  const date = new Date(time);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function norwegianDateFormatter(date: string | Date): string {
  return new Date(date).toLocaleDateString('nb-NO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

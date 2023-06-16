export const generateCircularText = (
  text: string = '',
  repetitions: number = 3,
  spacing: number = 1
) => {
  return Array(repetitions).fill(text).join('\u00A0'.repeat(spacing))
}

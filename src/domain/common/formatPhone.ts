export const formatPhone = (rawPhone: string): string => {
  let digits = rawPhone.replace(/\D/g, '')
  let result = ''

  if (digits.length > 0 && digits.startsWith('8')) {
    digits = '7' + digits.slice(1)
  }

  if (digits.length > 0 && !digits.startsWith('7')) {
    digits = '7' + digits
  }

  if (digits.length > 11) {
    digits = digits.slice(0, 11)
  }

  if (digits.length > 0) result = '+7'

  if (digits.length > 1) {
    result += ` (${digits.slice(1, 4)}`
  }

  if (digits.length > 4) {
    result += `) ${digits.slice(4, 7)}`
  }

  if (digits.length > 7) {
    result += `-${digits.slice(7, 9)}`
  }
  if (digits.length > 9) {
    result += `-${digits.slice(9, 11)}`
  }

  return result
}

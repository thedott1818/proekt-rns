export const validateRequired = (obj: any, fields: string[]): string[] => {
  const errors: string[] = []

  for (const field of fields) {
    if (!obj[field] || (typeof obj[field] === "string" && obj[field].trim() === "")) {
      errors.push(`${field} is required`)
    }
  }
  return errors
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9+\-\s()]+$/
  return phoneRegex.test(phone) && phone.length >= 8
}

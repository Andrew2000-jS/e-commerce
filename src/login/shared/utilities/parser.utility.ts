export function passwordParser(password: string): string {
    const regex = /[A-Z]/

    if (password.length < 8) throw new Error('password must be longer than 8 characters')
    if (!regex.test(password)) throw new Error('at least one uppercase character is required')

    return password
}

export function namesParser(value: string): string {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
    const numCharRegex = /\d/

    if (specialCharRegex.test(value)) throw new Error('special characters not allowed')
    if (numCharRegex.test(value)) throw new Error('numbers are not allowed')
    if (value === '') throw new Error('The selected field cannot be empty')

    return value
}

export function phoneParser(phone: string): string {
    const charRegex = /[a-zA-Z]/
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>\s]/

    if (charRegex.test(phone)) throw new Error('letters are not allowed')
    if (specialCharRegex.test(phone)) throw new Error('special characters are not allowed')
    if (phone === '') throw new Error('The selected field cannot be empty')

    return phone
}

export function emailParser(email: string): string {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!regex.test(email)) throw new Error('invalid email')

    return email
}

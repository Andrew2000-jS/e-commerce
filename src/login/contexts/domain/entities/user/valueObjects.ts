import { NameException, EmailException, PhoneException, PasswordException, AgeException } from './exceptions'

export class UserName {
    readonly _value: string

    constructor(value: string) {
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
        const numCharRegex = /\d/

        if (specialCharRegex.test(value) || numCharRegex.test(value) || value === '') throw new NameException()

        this._value = value
    }
}

export class UserAge {
    readonly _value: number

    constructor(value: number) {
        if (value < 0 || value > 100) throw new AgeException()

        this._value = value
    }
}
export class UserEmail {
    readonly _value: string

    constructor(value: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!regex.test(value)) throw new EmailException()

        this._value = value
    }
}

export class UserPhone {
    readonly _value: string

    constructor(value: string) {
        const charRegex = /[a-zA-Z]/
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>\s]/

        if (charRegex.test(value) || specialCharRegex.test(value) || value === '') throw new PhoneException()

        this._value = value
    }
}

export class UserPassword {
    readonly _value: string

    constructor(value: string) {
        const regex = /[A-Z]/

        if (value.length < 8 || !regex.test(value) || value === '') {
            this._value = ''
            throw new PasswordException()
        }

        this._value = value
    }
}

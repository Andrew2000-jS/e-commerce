export class EmptyFieldException extends Error {
    constructor() {
        super('The selected field cannot be empty')
    }
}

export class NameException extends Error {
    constructor() {
        super('The provided name or last name are not valid')
    }
}

export class PhoneException extends Error {
    constructor() {
        super('The provided phone is not valid')
    }
}

export class EmailException extends Error {
    constructor() {
        super('The provided email is not valid')
    }
}

export class AgeException extends Error {
    constructor() {
        super('The provided age is not valid')
    }
}

export class PasswordException extends Error {
    constructor() {
        super('The provided password is not valid')
    }
}

export class UserAlreadyException extends Error {
    constructor() {
        super('User already exist!')
    }
}

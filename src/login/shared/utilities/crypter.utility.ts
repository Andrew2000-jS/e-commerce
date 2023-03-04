import bcrypt from 'bcrypt'

export class Crypter {
    async encrypt(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        const compare = await bcrypt.compare(password, hash)
        return compare
    }
}

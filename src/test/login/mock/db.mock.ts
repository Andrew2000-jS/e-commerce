import {
    UserRepository,
    UserNotFoundException,
    UserAlreadyException,
    User
} from '@/login/contexts/domain'

export class MockDb implements UserRepository {
    db: User[] = []

    create(user: User): Promise<User> {
        const findUser = !!this.db.find(
            (u) => u.email._value === user.email._value
        )
        if (findUser) {
            throw new UserAlreadyException()
        }

        this.db.push(user)
        return Promise.resolve(user)
    }

    delete(id: number): Promise<void> {
        this.db = this.db.filter((_, i) => i !== id)
        return Promise.resolve()
    }

    update(user: User, id: number): Promise<User> {
        const usersList = this.db.filter((_, i) => i !== id)
        usersList.push(user)
        this.db = usersList
        return Promise.resolve(user)
    }

    findByEmail(email: string): Promise<User | undefined> {
        const foundUser = this.db.find((x) => email === x.email._value)
        return Promise.resolve(foundUser)
    }

    findById(id: number): Promise<User | undefined> {
        const foundUser = this.db.find((_, i) => id === i)

        if (foundUser === undefined) {
            throw new UserNotFoundException()
        }

        return Promise.resolve(new User(foundUser))
    }

    findByPhone(phone: string): Promise<User | undefined> {
        const foundUser = this.db.find((x) => phone === x.phone._value)
        return Promise.resolve(foundUser)
    }
}

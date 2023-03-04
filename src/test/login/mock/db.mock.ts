import { UserRepository, UserEntity, UserNotFoundException, UserAlreadyException } from '@/login/contexts/domain'

export class MockDb implements UserRepository {
    db: UserEntity[] = []

    create(user: UserEntity): Promise<UserEntity> {
        const findUser = !!this.db.find(u => u.email === user.email)
        if (findUser) {
            throw new UserAlreadyException()
        }

        this.db.push(user)
        return Promise.resolve(user)
    }

    delete(id: number): Promise<void> {
        this.db.filter((_, i) => i !== id)
        return Promise.resolve()
    }

    update(user: UserEntity, id: number): Promise<UserEntity> {
        const oldUserData = this.db.find((_, i) => i === id)
        const usersList = this.db.filter((_, i) => i !== id)

        const updateUser: UserEntity = {
            name: user.name ?? oldUserData?.name,
            lastName: user.lastName ?? oldUserData?.lastName,
            email: user.email ?? oldUserData?.email,
            phone: user.phone ?? oldUserData?.phone,
            password: user.password ?? oldUserData?.password,
            avatar: user.avatar ?? oldUserData?.avatar,
            gender: user.gender ?? oldUserData?.gender
        }

        usersList.push(updateUser)
        this.db = usersList
        return Promise.resolve(updateUser)
    }

    findByEmail(email: string): Promise<UserEntity | undefined> {
        const foundUser = this.db.find(x => email === x.email)
        return Promise.resolve(foundUser)
    }

    findById(id: number): Promise<UserEntity | undefined> {
        const foundUser = this.db.find((_, i) => id === i)

        if (foundUser === undefined) { throw new UserNotFoundException() }

        return Promise.resolve(foundUser)
    }

    findByPhone(phone: string): Promise<UserEntity | undefined> {
        const foundUser = this.db.find(x => phone === x.phone)
        return Promise.resolve(foundUser)
    }
}

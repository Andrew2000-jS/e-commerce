import {
    UserRepository,
    FindUserByIdServie,
    User,
    PrimitiveData as UserEntity,
    UserName,
    UserAge,
    UserEmail,
    UserPhone,
    UserPassword
} from '@/login/contexts/domain'
import { Crypter } from '@/login/shared'

export class UserUpdater {
    private readonly _userRepository: UserRepository
    private readonly _findUserByIdService: FindUserByIdServie

    constructor(userRepo: UserRepository) {
        this._userRepository = userRepo
        this._findUserByIdService = new FindUserByIdServie(this._userRepository)
    }

    async update(user: UserEntity, id: number): Promise<User> {
        const findById = await this._findUserByIdService.findId(id)
        const crypter = new Crypter()

        const userToUpdate = new User({
            name: new UserName(user.name) ?? new UserName(findById?.name._value),
            lastName: new UserName(user.lastName) ?? new UserName(findById?.lastName._value),
            age: new UserAge(user.age) ?? new UserAge(findById?.age._value),
            email: new UserEmail(user.email) ?? new UserEmail(findById?.email._value),
            avatar: user.avatar ?? findById.avatar,
            gender: user.gender ?? findById.gender,
            password: await crypter.encrypt(new UserPassword(user.password)._value) ?? new UserPassword(findById?.password),
            phone: new UserPhone(user.phone) ?? new UserPhone(findById?.phone._value)
        })

        await this._userRepository.update(userToUpdate, id)
        return userToUpdate
    }
}

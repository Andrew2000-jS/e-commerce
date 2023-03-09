import {
    UserRepository,
    IsUserExistService,
    User,
    PrimitiveData as UserEntity,
    UserName,
    UserAge,
    UserEmail,
    UserPhone,
    UserPassword
} from '@/login/contexts/domain'
import { Crypter } from '@/login/shared'

export class UserCreator {
    private readonly _userRepository: UserRepository
    private readonly _isUserExistService: IsUserExistService

    constructor(userRepo: UserRepository) {
        this._userRepository = userRepo
        this._isUserExistService = new IsUserExistService(this._userRepository)
    }

    async create(user: UserEntity): Promise<User> {
        const crypter = new Crypter()

        const newUser = new User({
            name: new UserName(user.name),
            lastName: new UserName(user.lastName),
            age: new UserAge(user.age),
            email: new UserEmail(user.email),
            avatar: user.avatar,
            gender: user.gender,
            password: await crypter.encrypt(new UserPassword(user.password)._value),
            phone: new UserPhone(user.phone)
        })

        await this._isUserExistService.isExist(
            newUser.email._value,
            newUser.phone._value
        )

        const createUser: User = await this._userRepository.create(newUser)
        return createUser
    }
}

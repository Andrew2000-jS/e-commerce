import { UserEntity, UserRepository, IsUserExistService } from '@/login/contexts/domain'
import { Crypter, emailParser, namesParser, passwordParser, phoneParser } from '@/login/shared'

export class UserCreator {
    private readonly _userRepository: UserRepository
    private readonly _isUserExistService: IsUserExistService

    constructor(userRepo: UserRepository) {
        this._userRepository = userRepo
        this._isUserExistService = new IsUserExistService(this._userRepository)
    }

    async create(user: UserEntity): Promise<UserEntity> {
        const crypter = new Crypter()
        const pass = await crypter.encrypt(passwordParser(user.password))

        const newUser: UserEntity = {
            name: namesParser(user.name),
            lastName: namesParser(user.lastName),
            email: emailParser(user.email),
            avatar: user.avatar,
            gender: user.gender,
            password: pass,
            phone: phoneParser(user.phone)
        }

        await this._isUserExistService.isExist(newUser.email, newUser.phone)

        const createUser = await this._userRepository.create(newUser)
        return createUser
    }
}

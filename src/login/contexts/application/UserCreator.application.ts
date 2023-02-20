import { UserEntity, UserRepository, IsUserExistService } from '@/login/contexts/domain'

export class UserCreator {
    private readonly _userRepository: UserRepository
    private readonly _isUserExistService: IsUserExistService

    constructor(userRepo: UserRepository) {
        this._userRepository = userRepo
        this._isUserExistService = new IsUserExistService(this._userRepository)
    }

    async create(user: UserEntity): Promise<UserEntity> {
        const newUser: UserEntity = {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar,
            gender: user.gender,
            password: user.password,
            phone: user.phone
        }

        await this._isUserExistService.isExist(newUser.email)

        const createUser = await this._userRepository.create(newUser)
        return createUser
    }
}

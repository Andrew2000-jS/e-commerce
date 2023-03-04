import { UserRepository, UserEntity, UserAlreadyException } from '@/login/contexts/domain'

export class IsUserExistService {
    private readonly _userRepository: UserRepository

    constructor(userRepo: UserRepository) {
        this._userRepository = userRepo
    }

    async isExist(email: string, phone: string): Promise<UserEntity | undefined> {
        const foundUser = await this._userRepository.findByEmail(email)
        const findByPhone = await this._userRepository.findByPhone(phone)

        if (foundUser !== undefined || findByPhone !== undefined) {
            throw new UserAlreadyException()
        }

        return foundUser
    }
}

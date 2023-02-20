import { UserRepository, UserEntity, UserAlreadyException } from '@/login/contexts/domain'

export class IsUserExistService {
    private readonly _userRepository: UserRepository

    constructor(userRepo: UserRepository) {
        this._userRepository = userRepo
    }

    async isExist(email: string): Promise<UserEntity | undefined> {
        const foundUser = await this._userRepository.findByEmail(email)

        if (foundUser !== undefined) {
            throw new UserAlreadyException()
        }

        return foundUser
    }
}

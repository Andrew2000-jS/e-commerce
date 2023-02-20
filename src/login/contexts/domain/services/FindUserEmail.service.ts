import { UserEntity, UserRepository, UserNotFoundException } from '@/login/contexts/domain'

export class FindUserByEmailServie {
    private readonly _userRepository: UserRepository

    constructor(userRepo: UserRepository) {
        this._userRepository = userRepo
    }

    async findEmail(email: string): Promise<UserEntity> {
        const foundUser = await this._userRepository.findByEmail(email)
        if (foundUser === undefined) {
            throw new UserNotFoundException()
        }

        return foundUser
    }
}

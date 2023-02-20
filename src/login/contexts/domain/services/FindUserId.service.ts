import { UserEntity, UserRepository, UserNotFoundException } from '@/login/contexts/domain'

export class FindUserByIdServie {
    private readonly _userRepository: UserRepository

    constructor(userRepo: UserRepository) {
        this._userRepository = userRepo
    }

    async findId(id: number): Promise<UserEntity> {
        const foundUser = await this._userRepository.findById(id)
        if (foundUser === undefined) {
            throw new UserNotFoundException()
        }

        return foundUser
    }
}

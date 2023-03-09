import { User, UserRepository, UserNotFoundException } from '@/login/contexts/domain'

export class FindUserByPhoneServie {
    private readonly _userRepository: UserRepository

    constructor(userRepo: UserRepository) {
        this._userRepository = userRepo
    }

    async findPhone(phone: string): Promise<User> {
        const foundUser = await this._userRepository.findByPhone(phone)
        if (foundUser === undefined) {
            throw new UserNotFoundException()
        }

        return foundUser
    }
}

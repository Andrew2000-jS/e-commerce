import { UserRepository, FindUserByIdServie } from '@/login/contexts/domain'

export class UserDeleter {
    private readonly _userRepository: UserRepository
    private readonly _findUserByIdService: FindUserByIdServie

    constructor(userRepo: UserRepository) {
        this._userRepository = userRepo
        this._findUserByIdService = new FindUserByIdServie(this._userRepository)
    }

    async delete(id: number): Promise<void> {
        await this._findUserByIdService.findId(id)
        await this._userRepository.delete(id)
    }
}

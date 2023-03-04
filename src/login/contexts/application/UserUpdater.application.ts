import { UserEntity, UserRepository, FindUserByIdServie } from '@/login/contexts/domain'
import { Crypter, emailParser, namesParser, passwordParser, phoneParser } from '@/login/shared'

export class UserUpdater {
    private readonly _userRepository: UserRepository
    private readonly _findUserByIdService: FindUserByIdServie

    constructor(userRepo: UserRepository) {
        this._userRepository = userRepo
        this._findUserByIdService = new FindUserByIdServie(this._userRepository)
    }

    async update(user: UserEntity, id: number): Promise<UserEntity> {
        const crypter = new Crypter()
        const findById = await this._findUserByIdService.findId(id)

        const userToUpdate: UserEntity = {
            name: namesParser(user.name) ?? namesParser(findById?.name),
            lastName: namesParser(user.lastName) ?? namesParser(findById?.lastName),
            email: emailParser(user.email) ?? emailParser(findById?.email),
            avatar: user.avatar ?? findById.avatar,
            gender: user.gender ?? findById.gender,
            password: await crypter.encrypt(passwordParser(user.password)) ?? findById?.password,
            phone: phoneParser(user.phone) ?? phoneParser(findById?.phone)
        }

        await this._userRepository.update(userToUpdate, id)
        return userToUpdate
    }
}

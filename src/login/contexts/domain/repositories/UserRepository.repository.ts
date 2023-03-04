import { UserEntity } from '../entities'

export interface UserRepository {
    create: (user: UserEntity) => Promise<UserEntity>
    delete: (id: number) => Promise<void>
    update: (user: UserEntity, id: number) => Promise<UserEntity>
    findById: (id: number) => Promise<UserEntity | undefined>
    findByEmail: (email: string) => Promise<UserEntity | undefined>
    findByPhone: (phone: string) => Promise<UserEntity | undefined>
}

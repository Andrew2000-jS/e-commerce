import { User } from '../entities'

export interface UserRepository {
    create: (user: User) => Promise<User>
    delete: (id: number) => Promise<void>
    update: (user: User, id: number) => Promise<User>
    findById: (id: number) => Promise<User | undefined>
    findByEmail: (email: string) => Promise<User | undefined>
    findByPhone: (phone: string) => Promise<User | undefined>
}

import { Genders } from '@/login/index'

export interface UserEntity {
    name: string
    lastName: string
    email: string
    phone: string
    password: string
    avatar: string
    gender: Genders
}

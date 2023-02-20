import { Genders } from '@/login/index'

export interface UserEntity {
    name: string
    lastName: string
    email: string
    phone: number
    password: string
    avatar: string
    gender: Genders
}

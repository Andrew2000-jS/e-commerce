import { UserEntity } from '@/login/contexts/domain'

enum Genders {
    Male = 'Male',
    Female = 'Female'
}

export const newUser: UserEntity = {
    name: 'Jhon',
    lastName: 'Doe',
    phone: 1234567,
    email: 'jhondoe@mail.com',
    avatar: 'https://vitest.dev/logo.svg',
    gender: Genders.Male,
    password: 'abc@123'
}

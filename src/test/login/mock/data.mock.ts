import { PrimitiveData as UserEntity } from '@/login/contexts/domain'

enum Genders {
    Male = 'Male',
    Female = 'Female'
}

export const newUser: UserEntity = {
    name: 'Jhon',
    lastName: 'Doe',
    age: 29,
    phone: '12345678',
    email: 'jhondoe@mail.com',
    avatar: 'https://vitest.dev/logo.svg',
    gender: Genders.Male,
    password: 'Abc@1234'
}

export const updatedUser: UserEntity = {
    name: 'Bill',
    lastName: 'Doe',
    age: 10,
    phone: '12345678',
    email: 'billdoe@mail.com',
    avatar: 'https://vitest.dev/logo.svg',
    gender: Genders.Male,
    password: 'ABC!22223333'
}

import { EntityRoot } from '../EntityRoot'
import {
    UserName,
    UserAge,
    UserEmail,
    UserPhone,
    UserPassword
} from './valueObjects'
import { Genders } from '@/login/index'

export interface PrimitiveData {
    name: string
    lastName: string
    age: number
    email: string
    phone: string
    password: string
    avatar: string
    gender: Genders
}

export class User extends EntityRoot<User, PrimitiveData> {
    readonly name: UserName
    readonly lastName: UserName
    readonly age: UserAge
    readonly email: UserEmail
    readonly phone: UserPhone
    readonly password: string
    readonly avatar: string
    readonly gender: Genders

    constructor({
        name,
        lastName,
        age,
        email,
        phone,
        password,
        avatar,
        gender
    }: {
        name: UserName
        lastName: UserName
        age: UserAge
        email: UserEmail
        phone: UserPhone
        password: string
        avatar: string
        gender: Genders
    }) {
        super()
        this.name = name
        this.lastName = lastName
        this.age = age
        this.email = email
        this.phone = phone
        this.password = password
        this.avatar = avatar
        this.gender = gender
    }

    static create(
        name: UserName,
        lastName: UserName,
        age: UserAge,
        email: UserEmail,
        phone: UserPhone,
        password: string,
        avatar: string,
        gender: Genders
    ): User {
        const user = new User({
            name,
            lastName,
            age,
            email,
            phone,
            password,
            avatar,
            gender
        })

        return user
    }

    static fromPrimitives(plainData: {
        name: string
        lastName: string
        age: number
        email: string
        phone: string
        password: string
        avatar: string
        gender: Genders
    }): User {
        return new User({
            name: new UserName(plainData.name),
            lastName: new UserName(plainData.lastName),
            age: new UserAge(plainData.age),
            email: new UserEmail(plainData.email),
            phone: new UserPhone(plainData.phone),
            password: new UserPassword(plainData.password)._value,
            avatar: plainData.avatar,
            gender: plainData.gender
        })
    }

    toPrimitives(): PrimitiveData {
        return {
            name: this.name._value,
            lastName: this.lastName._value,
            age: this.age._value,
            email: this.email._value,
            phone: this.phone._value,
            password: this.password,
            avatar: this.avatar,
            gender: this.gender
        }
    }
}

import { expect, it, describe } from 'vitest'
import { UserCreator } from '@/login/contexts/application'
import { MockDb, newUser } from '../mock'

describe('UserCreator', () => {
    it('should can create a new user', async () => {
        const loginMockDb = new MockDb()
        const userCreator = new UserCreator(loginMockDb)

        await userCreator.create(newUser)
        const findUser = loginMockDb.db.find(u => u.email === newUser.email)
        expect(findUser?.name).toBe(newUser.name)
    })

    describe('Fail cases', () => {
        it('should throw if user already exist', async () => {
            const loginMockDb = new MockDb()
            const userCreator = new UserCreator(loginMockDb)

            await userCreator.create(newUser)
            await expect(userCreator.create(newUser)).rejects.toThrow(/User already exist!/)

            newUser.email = 'abc1234@gmail.com'
            await expect(userCreator.create(newUser)).rejects.toThrow(/User already exist!/) // Fail because the phone number already exist

            newUser.phone = '12345678'
            newUser.email = 'jhondoe@mail.com'
        })

        it('should throw if user name and lastName contains invalid characters', async () => {
            const loginMockDb = new MockDb()
            const userCreator = new UserCreator(loginMockDb)

            newUser.name = 'bob@'
            await expect(userCreator.create(newUser)).rejects.toThrow(/special characters not allowed/)
            newUser.name = 'bob'

            newUser.lastName = 'Doe123'
            await expect(userCreator.create(newUser)).rejects.toThrow(/numbers are not allowed/)

            newUser.lastName = ''
            await expect(userCreator.create(newUser)).rejects.toThrow(/The selected field cannot be empty/)

            newUser.lastName = 'Doe'
        })

        it('should throw if user email is invalid', async () => {
            const loginMockDb = new MockDb()
            const userCreator = new UserCreator(loginMockDb)

            newUser.email = 'email'
            await expect(userCreator.create(newUser)).rejects.toThrow(/invalid email/)

            newUser.email = 'email  @gmail.com'
            await expect(userCreator.create(newUser)).rejects.toThrow(/invalid email/)

            newUser.email = 'email@gmailcom'
            await expect(userCreator.create(newUser)).rejects.toThrow(/invalid email/)

            newUser.email = ''
            await expect(userCreator.create(newUser)).rejects.toThrow(/invalid email/)

            newUser.email = 'jhondoe@mail.com'
        })

        it('should throw if user phone is invalid', async () => {
            const loginMockDb = new MockDb()
            const userCreator = new UserCreator(loginMockDb)

            newUser.phone = '00000000d000'
            await expect(userCreator.create(newUser)).rejects.toThrow(/letters are not allowed/)

            newUser.phone = '00000000@000'
            await expect(userCreator.create(newUser)).rejects.toThrow(/special characters are not allowed/)

            newUser.phone = '00000000 000'
            await expect(userCreator.create(newUser)).rejects.toThrow(/special characters are not allowed/)

            newUser.phone = ''
            await expect(userCreator.create(newUser)).rejects.toThrow(/The selected field cannot be empty/)

            newUser.phone = '12345678'
        })

        it('should throw if user password is not valid', async () => {
            const loginMockDb = new MockDb()
            const userCreator = new UserCreator(loginMockDb)

            newUser.password = ''
            await expect(userCreator.create(newUser)).rejects.toThrow(/password must be longer than 8 characters/)

            newUser.password = 'abc@123455'
            await expect(userCreator.create(newUser)).rejects.toThrow(/at least one uppercase character is required/)

            newUser.phone = 'Abc@12344444'
        })
    })
})

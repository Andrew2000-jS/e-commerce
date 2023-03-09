import { expect, it, describe } from 'vitest'
import { UserCreator, UserUpdater } from '@/login/contexts/application'
import { MockDb, newUser, updatedUser } from '../mock'

describe('UserUpdater', () => {
    it('should can update an user', async () => {
        const loginMockDb = new MockDb()
        const userCreator = new UserCreator(loginMockDb)
        const userUpdater = new UserUpdater(loginMockDb)

        await userCreator.create(newUser)
        const findUser = loginMockDb.db.find(u => u.email._value === newUser.email) // Jhon
        expect(findUser?.name._value).toBe(newUser.name)

        await userUpdater.update(updatedUser, 0)
        const findUpdatedUser = loginMockDb.db.find(u => u.name._value === updatedUser.name) // Bill
        expect(findUpdatedUser?.name._value).toBe(updatedUser.name)
    })

    describe('Fail cases', () => {
        it('should throw if user name and lastName contains invalid characters', async () => {
            const loginMockDb = new MockDb()
            const userCreator = new UserCreator(loginMockDb)
            const userUpdater = new UserUpdater(loginMockDb)

            await userCreator.create(newUser)

            updatedUser.name = 'Bill@'
            await expect(userUpdater.update(updatedUser, 0)).rejects.toThrow(/The provided name or last name are not valid/)
            updatedUser.name = 'Bill'

            updatedUser.lastName = 'Doe123'
            await expect(userUpdater.update(updatedUser, 0)).rejects.toThrow(/The provided name or last name are not valid/)

            updatedUser.lastName = ''
            await expect(userUpdater.update(updatedUser, 0)).rejects.toThrow(/The provided name or last name are not valid/)

            updatedUser.lastName = 'Doe'
        })

        it('should throw if user email is invalid', async () => {
            const loginMockDb = new MockDb()
            const userCreator = new UserCreator(loginMockDb)
            const userUpdater = new UserUpdater(loginMockDb)

            await userCreator.create(newUser)

            updatedUser.email = 'email'
            await expect(userUpdater.update(updatedUser, 0)).rejects.toThrow(/The provided email is not valid/)

            updatedUser.email = 'email  @gmail.com'
            await expect(userUpdater.update(updatedUser, 0)).rejects.toThrow(/The provided email is not valid/)

            updatedUser.email = 'email@gmailcom'
            await expect(userUpdater.update(updatedUser, 0)).rejects.toThrow(/The provided email is not valid/)

            updatedUser.email = ''
            await expect(userUpdater.update(updatedUser, 0)).rejects.toThrow(/The provided email is not valid/)

            updatedUser.email = 'billdoe@mail.com'
        })

        it('should throw if user phone is invalid', async () => {
            const loginMockDb = new MockDb()
            const userCreator = new UserCreator(loginMockDb)
            const userUpdater = new UserUpdater(loginMockDb)

            await userCreator.create(newUser)

            updatedUser.phone = '00000000d000'
            await expect(userUpdater.update(updatedUser, 0)).rejects.toThrow(/The provided phone is not valid/)

            updatedUser.phone = '00000000@000'
            await expect(userUpdater.update(updatedUser, 0)).rejects.toThrow(/The provided phone is not valid/)

            updatedUser.phone = '00000000 000'
            await expect(userUpdater.update(updatedUser, 0)).rejects.toThrow(/The provided phone is not valid/)

            updatedUser.phone = ''
            await expect(userUpdater.update(updatedUser, 0)).rejects.toThrow(/The provided phone is not valid/)

            updatedUser.phone = '12345678'
        })

        it('should throw if user password is not valid', async () => {
            const loginMockDb = new MockDb()
            const userCreator = new UserCreator(loginMockDb)
            const userUpdater = new UserUpdater(loginMockDb)

            await userCreator.create(newUser)

            updatedUser.password = ''
            await expect(userUpdater.update(updatedUser, 0)).rejects.toThrow(/The provided password is not valid/)

            updatedUser.password = 'abc@123455'
            await expect(userUpdater.update(updatedUser, 0)).rejects.toThrow(/The provided password is not valid/)

            updatedUser.phone = 'ABC!22223333'
        })
    })
})

import { expect, it, describe } from 'vitest'
import { UserCreator, UserUpdater } from '@/login/contexts/application'
import { MockDb, newUser, updatedUser } from '../mock'

describe('UserUpdater', () => {
    it('should can update an user', async () => {
        const loginMockDb = new MockDb()
        const userCreator = new UserCreator(loginMockDb)
        const userUpdater = new UserUpdater(loginMockDb)

        await userCreator.create(newUser)
        const findUser = loginMockDb.db.find(u => u.email === newUser.email) // Jhon
        expect(findUser?.name).toBe(newUser.name)

        await userUpdater.update(updatedUser, 0)
        const findUpdatedUser = loginMockDb.db.find(u => u.name === updatedUser.name) // Bill
        expect(findUpdatedUser?.name).toBe(updatedUser.name)
    })
})

import { expect, it, describe } from 'vitest'
import { UserDeleter, UserCreator } from '@/login/contexts/application'
import { MockDb, newUser } from '../mock'

describe('UserDeleter', () => {
    it('should can delete an user', async () => {
        const loginMockDb = new MockDb()
        const userCreator = new UserCreator(loginMockDb)
        const userDeleter = new UserDeleter(loginMockDb)

        await userCreator.create(newUser)

        expect(loginMockDb.db.length).toBe(1)

        const id = 0

        await userDeleter.delete(id)
        expect(loginMockDb.db.length).toBe(0)
    })

    describe('Fail cases', () => {
        it('should throw if user does not exist', async () => {
            const loginMockDb = new MockDb()
            const userDeleter = new UserDeleter(loginMockDb)

            expect(loginMockDb.db.length).toBe(0)

            await expect(userDeleter.delete(2)).rejects.toThrow(/User not found/)
            expect(loginMockDb.db.length).toBe(0)
            expect(loginMockDb.db.length).not.toBe(1)
        })
    })
})

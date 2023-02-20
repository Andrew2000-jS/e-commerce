import { expect, it, describe } from 'vitest'
import { UserCreator } from '@/login/contexts/application'
import { MockDb, newUser } from '../mock'

describe('UserCreator', () => {
    it('should create a new user', async () => {
        const loginMockDb = new MockDb()
        const userCreator = new UserCreator(loginMockDb)

        await userCreator.create(newUser)
        const findUser = loginMockDb.db.find(u => u.email === newUser.email)
        expect(findUser?.name).toBe(newUser.name)
    })
})

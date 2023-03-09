import { Pool } from 'pg'
import Config from './config'

export class PostgresDB {
    private static instance: PostgresDB
    private readonly _pool: Pool

    private constructor() {
        this._pool = Config
    }

    public static getInstance(): PostgresDB {
        if (!PostgresDB.instance) {
            PostgresDB.instance = new PostgresDB()
        }

        return PostgresDB.instance
    }

    public async query(query: string, params?: any[], connection?: any): Promise<any> {
        const client = connection || await this._pool.connect()
        try {
            const result = await client.query(query, params)
            return result.rows
        } finally {
            if (!connection) {
                client.release()
            }
        }
    }
}

export enum Genders {
    Male = 'Male',
    Female = 'Female'
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test'
            DB_HOST_DEV: string
            DB_USER_DEV: string
            DB_PASS_DEV: string
            DB_PORT_DEV: number
            DB_NAME_DEV: string
        }
    }
}

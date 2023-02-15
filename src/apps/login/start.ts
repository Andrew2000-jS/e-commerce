import { Server } from './server'

const server = new Server(8080)

async function main(): Promise<void> {
    await server.listen()
}

void main()

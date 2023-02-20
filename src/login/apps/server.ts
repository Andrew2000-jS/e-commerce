import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

export class Server {
  private readonly _express: Express
  private readonly _port: number

  constructor(port: number) {
    this._express = express()
    this._port = port
    this._express.use(cors())
    this._express.use(helmet())
    this._express.use(express.json())
    this._express.use(morgan('dev'))
  }

  async listen(): Promise<void> {
    return await new Promise((resolve) => {
      this._express.listen(this._port, () => {
        console.log(`Server on port ${this._port}`)
      })

      resolve()
    })
  }
}

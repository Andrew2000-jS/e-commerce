import express, { Express } from 'express'
import * as http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

export class Server {
  private readonly _express: Express
  private readonly _port: number
  private readonly _httpServer?: http.Server

  constructor(port: number) {
    this._port = port
    this._express = express()
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

  async stop(): Promise<void> {
    return await new Promise((resolve, reject) => {
      if (this._httpServer !== null) {
        this._httpServer?.close(error => {
          if (error !== null) {
            return reject(error)
          }
          return resolve()
        })
      }
      return resolve()
    })
  }
}

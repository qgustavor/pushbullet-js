import { EventEmitter } from 'node:events'
import type Encryption from './encryption'
import type { StreamData } from '../types'

const STREAM_BASE = 'wss://stream.pushbullet.com/websocket'

/**
 * Event emitter for the Pushbullet streaming API.
 */
export default class Stream extends EventEmitter {
  private apiKey: string
  private encryption?: Encryption
  private client?: WebSocket
  private pingTimeout?: NodeJS.Timeout

  constructor (apiKey: string, encryption?: Encryption) {
    super()
    this.apiKey = apiKey
    this.encryption = encryption
  }

  connect (): void {
    this.client = new WebSocket(STREAM_BASE + '/' + this.apiKey)

    this.client.addEventListener('open', () => {
      this.heartbeat()
      this.emit('connect')
    })

    this.client.addEventListener('close', () => {
      if (this.pingTimeout) {
        clearTimeout(this.pingTimeout)
      }
      this.emit('close')
    })

    this.client.addEventListener('error', (event: Event) => {
      this.emit('error', event)
    })

    this.client.addEventListener('message', async (event: MessageEvent) => {
      const data: StreamData = JSON.parse(event.data)
      if (this.encryption && data.type === 'push' && data.push?.encrypted) {
        const decipheredMessage = await this.encryption.decrypt(
          data.push.ciphertext
        )
        data.push = JSON.parse(decipheredMessage)
      }
      this.emit('message', data)
      if (data.type === 'nop') {
        this.heartbeat()
        this.emit('nop')
      } else if (data.type === 'tickle') {
        this.emit('tickle', data.subtype)
      } else if (data.type === 'push') {
        this.emit('push', data.push)
      }
    })
  }

  close (): void {
    this.client?.close()
  }

  private heartbeat (): void {
    if (this.pingTimeout) {
      clearTimeout(this.pingTimeout)
    }

    this.pingTimeout = setTimeout(() => {
      this.client?.close()
      this.connect()
    }, 30000 + 1000)
  }
}

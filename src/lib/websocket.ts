import "client-only";


class WebSocketManager {
  private ws: WebSocket | null = null
  private url: string
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private listeners: { [key: string]: ((event: unknown) => void)[] } = {}

  constructor(url: string) {
    this.url = url
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url)

        this.ws.onopen = (event) => {
          console.log("WebSocket connected")
          this.reconnectAttempts = 0
          this.emit("open", event)
          resolve()
        }

        this.ws.onmessage = (event) => {
          this.emit("message", event)
        }

        this.ws.onerror = (event) => {
          console.error("WebSocket error:", event)
          this.emit("error", event)
          reject(event)
        }

        this.ws.onclose = (event) => {
          console.log("WebSocket closed:", event.code, event.reason)
          this.emit("close", event)
          this.handleReconnect()
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)

      setTimeout(() => {
        this.connect().catch(console.error)
      }, this.reconnectDelay * this.reconnectAttempts)
    } else {
      console.error("Max reconnection attempts reached")
      this.emit("maxReconnectAttemptsReached", null)
    }
  }

  send(data: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data)
    } else {
      console.warn("WebSocket is not connected. Attempting to reconnect...")
      this.connect()
        .then(() => {
          if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(data)
          }
        })
        .catch(console.error)
    }
  }

  on(event: string, callback: (event: unknown) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event: string, callback: (event: unknown) => void) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback)
    }
  }

  private emit(event: string, data: unknown) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data))
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN
  }

  getReadyState(): number | null {
    return this.ws ? this.ws.readyState : null
  }
}

// สร้าง instance เดียวสำหรับทั้งแอป
export const wsManager = new WebSocketManager(process.env.NEXT_PUBLIC_ENDPOINT_URL_WS +'/ws/v1/chat' || "ws://localhost:8080" +'/ws/v1/chat')

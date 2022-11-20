import { Socket } from "socket.io-client"

class SocketService {
    socket: Socket | null

    constructor() {
        this.socket = null 
    }

    getSocket() {
        return this.socket
    }

    setSocket(socket: Socket | null) {
        this.socket = socket
    }
}

export default new SocketService()

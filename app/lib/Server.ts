import express from "express"

class Server {
  public server: express.Express

  constructor() {
    this.server = express()
  }

  public middleware(middlewares: any) {
    middlewares.forEach((mid: any) => {
      this.server.use(mid)
    })
  }

  public listen(port: string | number = process.env.PORT || 3000) {
    this.server.listen(port)
  }
}

export default new Server()
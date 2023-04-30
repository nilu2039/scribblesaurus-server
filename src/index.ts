import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
  },
})

type DrawLine = {
  color: string
  currentPoint: Point
  previousPoint: Point | null
}

type Point = {
  x: number
  y: number
}

const main = async () => {
  io.on("connection", (socket) => {
    console.log("a user connected with id", socket.id)
    socket.on(
      "draw-line",
      ({ previousPoint, currentPoint, color }: DrawLine) => {
        socket.broadcast.emit<"draw-line">("draw-line", {
          previousPoint,
          currentPoint,
          color,
        })
      }
    )
  })

  server.listen(4000, () => {
    console.log("server running on PORT 4000")
  })
}

main()

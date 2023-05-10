"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
const main = async () => {
    io.on("connection", (socket) => {
        console.log("a user connected with id", socket.id);
        socket.on("draw-line", ({ previousPoint, currentPoint, color }) => {
            socket.broadcast.emit("draw-line", {
                previousPoint,
                currentPoint,
                color,
            });
        });
    });
    server.listen(4000, () => {
        console.log("server running on PORT 4000");
    });
};
main();
//# sourceMappingURL=index.js.map
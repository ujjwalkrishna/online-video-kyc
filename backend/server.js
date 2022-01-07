require('dotenv').config();
const express = require('express');
const app = express();
const server = require("http").createServer(app);
const DbConnect = require('./database');
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path'); 

app.use(cookieParser());

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const corsOption = {
    credentials: true,
    //origin: ['http://localhost:3000'],
    origin: ['https://tvs-online-kyc.netlify.app'],
};

app.use(cors(corsOption));
app.use('/storage', express.static('storage'));
app.use('/recordings', express.static('recordings'));

const PORT = process.env.PORT || 5000;

DbConnect();
app.use(express.json({ limit: '8mb' }));
app.use(router);

app.get('/', (req, res) => {
    res.send("Hello From Express");
});

io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    console.log(socket.id);
    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", {
            signal: signalData,
            from,
            name,
        });
    });

    socket.on("updateMyMedia", ({ type, currentMediaStatus }) => {
        console.log("updateMyMedia");
        socket.broadcast.emit("updateUserMedia", { type, currentMediaStatus });
    });

    socket.on("msgUser", ({ name, to, msg, sender }) => {
        io.to(to).emit("msgRcv", { name, msg, sender });
    });

    socket.on("answerCall", (data) => {
        socket.broadcast.emit("updateUserMedia", {
            type: data.type,
            currentMediaStatus: data.myMediaStatus,
        });
        io.to(data.to).emit("callAccepted", data);
    });
    socket.on("endCall", ({ id }) => {
        io.to(id).emit("endCall");
    });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

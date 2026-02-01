// const express = require('express') if type is common js but here we have type module   http://localhost:3000/api/auth/login
import express from "express";
import path from "path" ;
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser" ;
import {app} from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;
app.use(express.json(
  {limit:"5mb"}
));
// app.use(cors({orgin:ENV.CLIENT_URL ||" https://localhost:5173 " , credentials:true}));
app.use (cookieParser());

app.use(cors({
  origin: ENV.CLIENT_URL || "http://localhost:5173", // NO trailing spaces!
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use("/api/auth" , authRoutes) ;
app.use("/api/messages", messageRoutes) ;

if (ENV.NODE_ENV === "production" ) {
    app.use (express.static ( path. join ( __dirname , "../frontend/dist " ) ) ) ;

app.get("/:path(*)", (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

}

app.listen(PORT, () => {
    console.log("Server is runing on port: "+ PORT);
    connectDB();
});
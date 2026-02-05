// const express = require('express') if type is common js but here we have type module   http://localhost:3000/api/auth/login
import express from "express";
import path from "path" ;
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser" ;
import {app , server} from "./lib/socket.js";
import { connectDB } from "./lib/db.js";
import messageRoutes from "./routes/message.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import { arjectProtection } from "./middleware/Arcjet.middleware.js";
import friendRequestRoutes from "./routes/friendRequestRoutes.js";


const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;
app.use(express.json(
  {limit:"5mb"}
));
app.use(cors({
  origin: ENV.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// Handle preflight requests explicitly



// app.use(express.json(
//   {limit:"5mb"}
// ));
// app.use(cors({orgin:ENV.CLIENT_URL ||" https://localhost:5173 " , credentials:true}));
app.use (cookieParser());

app.set("trust proxy", 1);


app.use("/api/auth" , authRoutes) ;
app.use("/api/messages", messageRoutes) ;
app.use("/api/friends", friendRequestRoutes);



// if (ENV.NODE_ENV === "production" ) {
//     app.use (express.static ( path. join ( __dirname , "../frontend/dist " ) ) ) ;

// app.get("/:path(*)", (_, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });

// }
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // app.get("/path(*)", (_, res) => {
  //   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  // });
app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });




  // app.use(arjectMiddleware);
    app.use(arjectProtection);

}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Kill other process or change PORT.`);
    process.exit(1);
  }
});

import express from "express";
import http from "http";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { initSocket } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import friendRequestRoutes from "./routes/friendRequestRoutes.js";
import mongoose from "mongoose";

const app = express();
const server = http.createServer(app);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
  origin: ENV.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

// ───────────────────────── middleware ─────────────────────────
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ───────────────────────── routes ─────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/friends", friendRequestRoutes);

// ───────────────────────── socket attach ─────────────────────────
initSocket(server);

// ───────────────────────── start server ─────────────────────────
const PORT = ENV.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});

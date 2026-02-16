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

const app = express();
app.set("trust proxy", 1);



const server = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// app.use(cors({
//   origin: ENV.CLIENT_URL || "http://localhost:5173",
//   credentials: true,
// }));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (
      origin.includes("vercel.app") ||
      origin === "http://localhost:5173"
    ) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

// ───────────────────────── middleware ─────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ───────────────────────── routes ─────────────────────────
// app.use("/api", protectRoute) ; we ccut it because its breaking login also it should be added in auth routes only
app.use("/api/auth", authRoutes);
app.use("/api/messages",  messageRoutes);
app.use("/api/friends",   friendRequestRoutes);
// app.use("/api/users" , userRoutes); not needed as i get getuser chats from message controller
app.get("/", (_req, res) => {
  res.send("Backend running 🚀");
});

// ───────────────────────── socket attach ─────────────────────────
initSocket(server);
console.log("JWT_SECRET ON RENDER:", process.env.JWT_SECRET);
console.log("NODE_ENV:", process.env.NODE_ENV);

// ───────────────────────── start server ─────────────────────────
const PORT = ENV.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});

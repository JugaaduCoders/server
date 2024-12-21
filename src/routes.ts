import express from "express";
import hackathonRoutes from "./endpoints/hackathon/hackathonRoutes";
import userRoutes from "./endpoints/user/userRoutes";
import { authMiddleware } from "./utils/middleware";
const app = express();

app.use("/api/user", authMiddleware, userRoutes);
app.use("/api/hackathon", authMiddleware, hackathonRoutes);

export default app;

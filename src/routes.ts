import express from "express";
import hackathonRoutes from "./endpoints/hackathon/hackathonRoutes";
import userRoutes from "./endpoints/user/userRoutes";
const app = express();

app.use("/api/user", userRoutes);
app.use("/api/hackathon", hackathonRoutes);

export default app;

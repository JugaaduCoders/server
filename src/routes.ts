import express from "express";
// import hackathonRoutes from "./modules/hackathon/hackathonRoutes";
import userRoutes from "./modules/user/userRoutes";
const app = express();
app.use("/api/user", userRoutes);

export default app;

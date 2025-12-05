import express from "express";
//import usersRouter from "./routes/users.route";

const app = express();

app.use(express.json());

// Routes
//app.use("/users", usersRouter);

export default app;

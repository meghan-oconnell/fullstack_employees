import express from "express";
import employeesRouter from "./api/employees.js";

const app = express();

app.use(express.json());

app.route("/").get((req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// employees route
app.use("/employees", employeesRouter);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong.");
});

export default app;

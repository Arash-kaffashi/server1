import express from "express";
import dotenv from "dotenv";
import processRoute from "./routes/process.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/process/", processRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
  );
});

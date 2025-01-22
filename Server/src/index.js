import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./DB/index.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error listening", err);
  });
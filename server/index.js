import "dotenv/config";
import Express from "express";
import cors from "cors";

const PORT = 3000;
const app = Express();

app.use(cors({ origin: process.env.FRONTEND_URL }));

app.listen((error) => {
  if (error) {
    console.error(error);
  }

  console.log(`Port listening on ${PORT}`);
});

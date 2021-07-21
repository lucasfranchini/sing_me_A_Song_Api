import express from "express";
import cors from "cors";
import connection from "./database";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", async (req, res) => {
  const result = await connection.query('select * from recommendations')

  res.send(result.rows)
});

export default app;

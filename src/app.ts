import express from "express";
import cors from "cors";
import * as recommendationsController from "./controllers/recommendationsController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationsController.addMusic);
app.post("/recommendations/:id/upvote", recommendationsController.addScore);
app.post("/recommendations/:id/downvote", recommendationsController.subtractScore);

export default app;

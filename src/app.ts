import express from "express";
import cors from "cors";
import * as recommendationsController from "./controllers/recommendationsController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationsController.addMusic);
app.post("/recommendations/:id/upvote", recommendationsController.addScore);
app.post("/recommendations/:id/downvote", recommendationsController.subtractScore);
app.get("/recommendations/random",recommendationsController.randomRecommendation);
app.get("/recommendations/top/:amount",recommendationsController.topRecommendations);

export default app;

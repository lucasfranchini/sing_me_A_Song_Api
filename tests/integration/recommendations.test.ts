import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, closeConnection } from "../utils/database";
import { generateRecommendation } from "../factories/recommendationsFactory";

const agent = supertest(app);

beforeEach(clearDatabase)
afterAll(closeConnection)

describe("POST /recommendations", () => {
  
  it("returns status 400 from invalid youtube link", async ()=>{
    const body = await generateRecommendation('','errado');
    const res = await agent.post('/recommendations').send(body);
    expect(res.status).toEqual(400);
  })
  it("returns status 400 from empty params", async ()=>{
    const body = {};
    const res = await agent.post('/recommendations').send(body);
    expect(res.status).toEqual(400);
  })
  it("returns status 201 from valid params", async ()=>{
    const body = await generateRecommendation('','');
    const res = await agent.post('/recommendations').send(body);
    expect(res.status).toEqual(201);
  })
  it("returns status 409 from duplicated youtube link", async ()=>{
    const body = await generateRecommendation('','');
    await agent.post('/recommendations').send(body);
    const res = await agent.post('/recommendations').send(body);
    expect(res.status).toEqual(409);
  })
  
});

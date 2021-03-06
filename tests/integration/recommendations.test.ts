import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, closeConnection } from "../utils/database";
import { alterScore, generateRecommendation, saveRecommendationInDatabase } from "../factories/recommendationsFactory";
import connection from "../../src/database";

const agent = supertest(app);

beforeEach(clearDatabase)
afterAll(closeConnection)

describe("POST /recommendations", () => {
  it("returns status 400 from invalid youtube link", async ()=>{
    const body = generateRecommendation('','errado');
    const res = await agent.post('/recommendations').send(body);
    expect(res.status).toEqual(400);
  })
  it("returns status 400 from empty params", async ()=>{
    const body = {};
    const res = await agent.post('/recommendations').send(body);
    expect(res.status).toEqual(400);
  })
  it("returns status 201 from valid params", async ()=>{
    const body = generateRecommendation('','');
    const res = await agent.post('/recommendations').send(body);
    expect(res.status).toEqual(201);
  })
  it("returns status 409 from duplicated youtube link", async ()=>{
    const body = generateRecommendation('','');
    await agent.post('/recommendations').send(body);
    const res = await agent.post('/recommendations').send(body);
    expect(res.status).toEqual(409);
  })
});

describe('POST /recommendations/:id/upvote', () =>{
  beforeEach(saveRecommendationInDatabase)
  it('returns status 404 for invalid id', async ()=>{
    const res = await agent.post('/recommendations/3/upvote');
    expect(res.status).toEqual(404);
  })
  it('returns status 200 for valid id', async ()=>{
    const res = await agent.post('/recommendations/1/upvote');
    expect(res.status).toEqual(200);
  })
  it('adds score for a valid recommendation',async ()=>{
    await agent.post('/recommendations/1/upvote');
    const res =  await connection.query('SELECT score FROM recommendations')
    expect(res.rows[0].score).toEqual(1)
  })
})

describe('POST /recommendations/:id/downvote', () =>{
  
  beforeEach(saveRecommendationInDatabase)
  it('returns status 404 for invalid id', async ()=>{
    const res = await agent.post('/recommendations/3/downvote');
    expect(res.status).toEqual(404);
  })
  it('returns status 200 for valid id', async ()=>{
    const res = await agent.post('/recommendations/1/downvote');
    expect(res.status).toEqual(200);
  })
  it('subtracts score for a valid recommendation',async ()=>{
    await agent.post('/recommendations/1/downvote');
    const res =  await connection.query('SELECT score FROM recommendations')
    expect(res.rows[0].score).toEqual(-1)
  })
  it('removes a recommendations when score is less than -5', async ()=>{
    await alterScore(-5,1);
    await agent.post('/recommendations/1/downvote');
    const res =  await connection.query('SELECT score FROM recommendations');
    expect(res.rowCount).toEqual(0);
  })
})

describe('GET /recommendations/random', ()=>{
  it('returns status 404 for empty database', async ()=>{
    const res = await agent.get('/recommendations/random')
    expect(res.status).toEqual(404)
  })
  it('returns status 200 for valid get', async ()=>{
    const body = await saveRecommendationInDatabase();
    const res = await agent.get('/recommendations/random')
    expect(res.status).toEqual(200)
  })
  it('returns a object for valid get', async ()=>{
    const body = await saveRecommendationInDatabase();
    const res = await agent.get('/recommendations/random')
    expect(res.body).toEqual(body)
  })
});

describe('GET /recommendations/top/:amount',()=>{
  it('returns status 500 for invalid amount',async ()=>{
    const res = await agent.get('/recommendations/top/GG');
    expect(res.status).toEqual(500);
  })
  it('returns status 400 for amount less than 0',async ()=>{
    const res = await agent.get('/recommendations/top/-3');
    expect(res.status).toEqual(400);
  })
  it('returns status 200 for valid amount',async ()=>{
    await saveRecommendationInDatabase()
    const res = await agent.get('/recommendations/top/3');
    expect(res.status).toEqual(200);
  })
  it('returns right array order for valid amount',async ()=>{
    await saveRecommendationInDatabase();
    await saveRecommendationInDatabase();
    await alterScore(5,2);
    const res = await agent.get('/recommendations/top/3');
    expect(res.body[0].score).toEqual(5);
  })

  it('returns right amount order for valid amount',async ()=>{
    await saveRecommendationInDatabase();
    await saveRecommendationInDatabase();
    const res = await agent.get('/recommendations/top/1');
    expect(res.body.length).toEqual(1);
  })
});
import "./setup";
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, closeConnection } from "../utils/database";

beforeEach(clearDatabase)
afterAll(closeConnection)

describe("POST /recommendations", () => {
  it("returns status 400 from invalid name", async ()=>{})
  it("returns status 400 from invalid youtube link", async ()=>{})
  it("returns status 400 from empty params", async ()=>{})
  it("returns status 409 from duplicated youtube link", async ()=>{})
  it("returns status 201 from valid params", async ()=>{})
});

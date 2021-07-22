import "./setup";
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, closeConnection } from "../utils/database";

beforeAll(clearDatabase)
afterAll(closeConnection)

describe("POST /recommendations", () => {
  
});

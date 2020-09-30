const supertest = require("supertest");
const app = require("../../app");
const testComment = require('../test-data/newComment.json');

const endpointURL= "/api/blog/";
let oneArticleId;
describe(endpointURL,() =>{
    test("GET"+ endpointURL, async ()=>{
        const response = await supertest(app).get(endpointURL);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].image).toBeDefined();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].content).toBeDefined();
        oneArticleId = response.body[0]._id;
    }, 30000);

    test("GET by Id" + endpointURL + ":id", async () =>{
        const response = await supertest(app).get(endpointURL + oneArticleId);
        expect(response.statusCode).toBe(200);
    },30000);

    test("Get by Id should handle errors", async () =>{
        const response = await supertest(app).get(endpointURL + oneArticleId+"error");
        expect(response.statusCode).toBe(500);
    },30000);

});

describe("POST /api/blog/id a comment", () =>{
    test("It should return a 201 on POST", async() =>{
        const response = await supertest(app)
        .post(endpointURL + oneArticleId)
        .send(testComment);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("comment");
        expect(response.type).toBe("application/json");

    }, 30000);

    test("It should return a 500 error for all bad request", async() =>{
        const response = await supertest(app)
        .post(endpointURL + oneArticleId)
        .send({ "invalidData":"This is an error"});
        expect(response.statusCode).toBe(500);
    });
})
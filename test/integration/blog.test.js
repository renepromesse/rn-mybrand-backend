const supertest = require("supertest");
const app = require("../../app");

const endpointURL= "/api/blog";

describe(endpointURL,() =>{
    it("GET"+ endpointURL, async ()=>{
        const response = await supertest(app).get(endpointURL);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].image).toBeDefined();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].content).toBeDefined();
    }, 30000);

});
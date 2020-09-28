const supertest = require("supertest");
const testData = require("../test-data/newContact.json");
const app = require("../../app");

const endpointURL= "/api/contact";

describe(endpointURL,() =>{

    it("GET"+ endpointURL, async ()=>{
        const response = await supertest(app).get(endpointURL);
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({message:"Welcome on contact Page"});
    },20000);

    it("POST"+ endpointURL, async ()=>{
        const response = await supertest(app)
        .post(endpointURL)
        .send(testData);
        expect(response.statusCode).toBe(201);
        expect(response.body).toStrictEqual({message:"The message sent successfully"});
    }, 30000);

    it("should handle errors from the user", async () =>{
        const response = await supertest(app)
        .post(endpointURL)
        .send({invalidData: "This is an error."});
        expect(response.statusCode).toBe(400);
        
    })
});


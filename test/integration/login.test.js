const { response } = require('express');
const supertest = require ('supertest');
const app = require('../../app');
const testLogin = require('../test-data/newLogin.json');
const testArticle = require('../test-data/newArticle.json');
const mongoose = require('mongoose');

let token;
let oneArticle;
let loginURL = "/api/login/";
let messageURL = "/api/messages";
let articlesURL = "/api/articles/";


describe("GET /api/login", () =>{
    test("It should return a welcome message", async() =>{
       const response = await supertest(app).get(loginURL);
       expect(response.statusCode).toBe(200);
       expect(response.type).toBe("application/json");
       expect(response.body).toStrictEqual({message : "Welcome on Login Page"});
    });
});

describe("POST /api/login", () =>{
    test("Login with valid data", async ()=>{
        const response = await supertest(app)
        .post(loginURL)
        .send(testLogin);
        token = response.header['the-token'];
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe("application/json");
        
    }, 30000);

    test("Login with invalid property", async () => {
        const response = await supertest(app).post(loginURL)
        .send({"invalidData": "This is an error"});
        expect(response.statusCode).toBe(500);
        expect(response.type).toBe("application/json");
    });

    test("Login with invalid data", async() =>{
        const response = await supertest(app).post(loginURL)
        .send({email : "test@gmail.com", password : "test"});
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe("application/json");
        expect(response.body).toStrictEqual({message:"Incorrect email or password"});
    }, 30000);

});

describe("GET /api/messages with a jwt", ()=>{
    test("It should return data when a jwt is specified", async() =>{
        const response = await supertest(app).get(messageURL).set('the-token', token);
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("application/json");
        expect(Array.isArray(response.body)).toBeTruthy();
    },30000);
    test("It should return error when a jwt is invalid", async() =>{
        invalidToken = "eyJhbGciOiJIUzI1Nirened5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjY1ZTY0OTViM2Y4Y2UwMjM0NGFmZGQiLCJpYXQiOjE2MDEzOTM5Njd9.rAsFlOsSJkQC9eWAtK2VMRF6hX8DDFfp7Vyf6i1lWlo"
        const response = await supertest(app).get(messageURL).set('the-token', invalidToken);
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe("application/json");
        expect(response.body).toStrictEqual({ message :"Invalid Token"});
    });
    test("It should return error when a jwt is not specified", async() =>{
        const response = await supertest(app).get(messageURL);
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe("application/json");
        expect(response.body).toStrictEqual({ message :"Access Denied!"});
    });

});


describe("GET /api/articles", () =>{
    test("get articles with a valid token", async ()=>{
        const response = await supertest(app).get(articlesURL).set('the-token', token);
        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toHaveProperty("title");
        expect(response.body[0]).toHaveProperty("image");
        expect(response.body[0]).toHaveProperty("content");
    },30000);
    test("It should return error when a jwt is not specified", async() =>{
        const response = await supertest(app).get(articlesURL);
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe("application/json");
        expect(response.body).toStrictEqual({ message :"Access Denied!"});
    },30000);

});


describe("POST /api/articles", () =>{
    test("articles with valid data and a jwt", async ()=>{
        const response = await supertest(app)
        .post(articlesURL)
        .send(testArticle).set('the-token', token);
        oneArticle = response.body._id;
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty("title");
        expect(response.body).toHaveProperty("image");
        expect(response.body).toHaveProperty("content");
        
    }, 30000);

    test("post with invalid property", async () => {
        const response = await supertest(app).post(articlesURL).set('the-token', token)
        .send({"invalidData": "This is an error"});
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe("application/json");
    });

    test("It should return error when a jwt is not specified", async() =>{
        const response = await supertest(app).post(articlesURL).send(testArticle);
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe("application/json");
        expect(response.body).toStrictEqual({ message :"Access Denied!"});
    },30000);
});

describe("PUT /api/articles/id", () =>{
    test("update an article with valid data and a jwt", async ()=>{
        const response = await supertest(app)
        .put(articlesURL + oneArticle)
        .send({image: "This is an updated image test.png"}).set('the-token', token);
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe("application/json");
        expect(response.body).toStrictEqual({ message: "Article is updated successfully!"});
    }, 30000);

    test("put with invalid property", async () => {
        const response = await supertest(app).put(articlesURL + oneArticle).set('the-token', token)
        .send({"invalidData": "This is an error"});
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe("application/json");
    }, 30000);

    test("update with no property", async () => {
        const response = await supertest(app).put(articlesURL + oneArticle).set('the-token', token)
        .send({});
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe("application/json");
        expect(response.body).toStrictEqual({message:"Can't update with empty data"});

    }, 30000);

    test("It should return error when a jwt is not specified", async() =>{
        const response = await supertest(app).put(articlesURL + oneArticle)
        .send({image: "This is an updated image test.png"});
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe("application/json");
        expect(response.body).toStrictEqual({ message :"Access Denied!"});
    },30000);
});


describe("DELETE /api/articles/id", () =>{
    test("delete an article with a jwt", async ()=>{
        const response = await supertest(app)
        .delete(articlesURL + oneArticle).set('the-token', token);
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe("application/json");
        expect(response.body).toStrictEqual({message:"Article and associated comments are deleted successfully"});
    }, 30000);

    test("It should return error when a jwt is not specified", async() =>{
        const response = await supertest(app).delete(articlesURL + oneArticle);
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe("application/json");
        expect(response.body).toStrictEqual({ message :"Access Denied!"});
    },30000);
});


afterAll(async () =>{
    await mongoose.connection.close();
});
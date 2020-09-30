const blogController = require('../../controllers/blog');


describe("blogController.listArticles", () =>{
    it("shoul have be a function", ()=>{
        expect(typeof blogController.listArticles).toBe("function");

    });
})
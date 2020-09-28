const readController = require("../../controllers/read_comments");

describe("readController.readArticle", () =>{
    it("should have readArticle function", () =>{
        expect(typeof readController.readArticle).toBe("function");
    });
});
describe("readController.addComment", () =>{
    it("should have addComment function", () =>{
        expect(typeof readController.addComment).toBe("function");
    });
});

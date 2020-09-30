const articleController = require('../../controllers/articles');

describe("articleController.postArticle", () =>{
    it("should have a function of posting", ()=>{
        expect(typeof articleController.postArticle).toBe("function");
    });
});
describe("articleController.savedArticles", () =>{
    it("should have a function to retrieve articles", ()=>{
        expect(typeof articleController.savedArticles).toBe("function");
    });
});
describe("articleController.updateArticles", () =>{
    it("should have a function to updata an article", ()=>{
        expect(typeof articleController.updateArticle).toBe("function");
    });
});
describe("articleController.deleteArticles", () =>{
    it("should have a function to delete articles", ()=>{
        expect(typeof articleController.deleteArticle).toBe("function");
    });
});


const contactController = require("../../controllers/contact");

describe("contactController.defaultPage", () =>{
    it("should have defaulPage", () =>{
        expect(typeof contactController.defaultPage).toBe("function");
    });
});

describe("contactController.sendMessage", () =>{
    it("should have a sendMessage function", ()=>{
        expect(typeof contactController.sendMessage).toBe("function");
    });

})
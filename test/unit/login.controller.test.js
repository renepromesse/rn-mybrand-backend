const loginController = require("../../controllers/login");

describe("loginController.defaultPage", () =>{
    it("should have a defaulPage", () =>{
        expect(typeof loginController.defaultPage).toBe("function");
    });
});
describe("loginController.loginCheck", () =>{
    it("should have a loginCheck function", () =>{
        expect(typeof loginController.loginCheck).toBe("function");
    });
});


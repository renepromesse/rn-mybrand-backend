const messageController = require("../../controllers/message");

describe("messageController.viewMessages", () =>{
    it("should have a viewMessages function", () =>{
        expect(typeof messageController.viewMessages).toBe("function");
    });
});

const { expect } = require("chai");
const { GatewayError } = require("../utils/helpers");

describe("Unit Test", () => {
  describe("Testing service custom error 'GatewayError'", () => {
    it("Is a new 'Error' object not an instance of 'GatewayError'", () => {
      expect(new Error()).not.instanceof(GatewayError);
    });

    it("Is a new 'GatewayError' object an instance of 'Error'", () => {
      expect(new GatewayError()).to.instanceof(Error);
    });

    it("Is a new 'GatewayError' object an instance of 'GatewayError'", () => {
      expect(new GatewayError()).to.instanceof(GatewayError);
    });

    it("A new 'GatewayError' object should have a 'message' property which value type is a 'string'", () => {
      expect(new GatewayError("Gateway Error", 500))
        .to.have.property("message")
        .that.is.a("string");
    });

    it("A new 'GatewayError' object should have a 'status' property which value type is a 'number'", () => {
      expect(new GatewayError("Gateway Error", 500))
        .to.have.own.property("status")
        .that.is.a("number");
    });
  });
});

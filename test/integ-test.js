process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

const gatewayArr = [
  {
    gatewaySerial: "73057285376818455221",
    gatewayName: "Madalyn",
    ipv4: "19.229.89.31",
  },
  {
    gatewaySerial: "20516306148551955013",
    gatewayName: "Brynna",
    ipv4: "198.1.9.174",
  },
  {
    gatewaySerial: "85185569957041951719",
    gatewayName: "Nerta",
    ipv4: "247.201.254.183",
  },
  {
    gatewaySerial: "79939905533483127635",
    gatewayName: "Althea",
    ipv4: "137.162.118.23",
  },
  {
    gatewaySerial: "26546361484879739940",
    gatewayName: "Margalo",
    ipv4: "212.17.107.185",
  },
];

describe("Integration Test", () => {
  describe("Preparing Integration Test", () => {
    gatewayArr.forEach((gateway) => {
      it(`Deleting gateway "${gateway.gatewayName}" from db`, function (done) {
        this.timeout(5000);
        chai
          .request(server)
          .delete("/api/delgateway")
          .send({ gatewaySerial: gateway.gatewaySerial })
          .end((_, res) => {
            if (res.status === 404) {
              expect(res.text).to.equal("Error: Gateway not found");
            } else {
              expect(res).to.have.status(200);
            }
            done();
          });
      });
    });
  });

  //Adding 10 gateways to db
  describe("Testing '/api/addgateway' entry point", () => {
    gatewayArr.forEach((gateway) => {
      it(`Adding gateway "${gateway.gatewayName}" to db`, function (done) {
        this.timeout(5000);
        chai
          .request(server)
          .post("/api/addgateway")
          .send(gateway)
          .end((_, res) => {
            if (res.status === 409) {
              expect(res.text).to.equal("Error: Gateway already exist");
            } else if (res.status === 400) {
              expect(res.text).to.have.string(
                "Error: Bad Gateway IPv4 Address",
                "Error: Missing Gateway Data"
              );
            } else {
              expect(res).to.have.status(201);
              expect(res.body).to.have.property(
                "gatewayserial",
                gateway.gatewaySerial
              );
              expect(res.body).to.have.property(
                "gatewayname",
                gateway.gatewayName
              );
              expect(res.body).to.have.property("ipv4", gateway.ipv4);
            }
            done();
          });
      });
    });
  });
});

process.env.NODE_ENV = "test";
process.env.PORT = 3300;
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

const deviceArr = [
  {
    uid: 1549154416,
    vendor: "Madaih",
    status: "online",
  },
  {
    uid: 6069351410,
    vendor: "Egbert",
    status: "online",
  },
  {
    uid: 8835714188,
    vendor: "Fulmer",
    status: "offline",
  },
  {
    uid: 9239843776,
    vendor: "Bibi",
    status: "online",
  },
  {
    uid: 7839712447,
    vendor: "Scammon",
    status: "online",
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

  //Creating 10 gateways in db
  describe("Testing '/api/addgateway' entry point(Create)", () => {
    gatewayArr.forEach((gateway) => {
      it(`Adding gateway "${gateway.gatewayName}" to db`, function (done) {
        this.timeout(5000);
        chai
          .request(server)
          .post("/api/addgateway")
          .send(gateway)
          .end((err, res) => {
            expect(err).to.be.null;
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

  //Retrieving all gateways from db
  describe("Testing '/api/getallgateways' entry point(Retriev)", () => {
    it("Retrieving all gateways from db", function (done) {
      this.timeout(5000);
      chai
        .request(server)
        .get("/api/getallgateways")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          res.body.forEach((gateway) => {
            expect(gateway)
              .to.have.property("gatewaySerial")
              .that.is.a("string");
            expect(gateway).to.have.property("gatewayName").that.is.a("string");
            expect(gateway)
              .to.have.property("associatedDevices")
              .that.is.a("number");
          });
          done();
        });
    });
  });

  //Updating gateways by adding devices to each one
  describe("Testing '/api/adddevice' entry point(Update)", () => {
    deviceArr.forEach((device) => {
      it(`Adding device '${device.uid}' to gateway '${gatewayArr[0].gatewayName}'`, function (done) {
        this.timeout(5000);
        chai
          .request(server)
          .put("/api/adddevice")
          .send({
            gatewaySerial: gatewayArr[0].gatewaySerial,
            device,
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            const [returnedDevice] = res.body.devices.filter(
              (dev) => dev.uid === device.uid
            );
            expect(returnedDevice).to.have.property("uid", device.uid);
            expect(returnedDevice).to.have.property("vendor", device.vendor);
            expect(returnedDevice).to.have.property("status", device.status);
            done();
          });
      });
    });
  });

  //Deleting all gateways
  describe("Testing '/api/delgateway' entry point(Delete)", () => {
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
});

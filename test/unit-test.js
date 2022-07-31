//Unit Testing.
const { expect } = require("chai");
const { GatewayError, ValidateGateway } = require("../utils/helpers");
const badIpv4Arr = [
  "192.168.1.",
  ".168.1.1",
  "192..1.1",
  "192.168..1",
  "192.168.1",
  "192.1.1",
  "168.1.1",
  "192.168",
  "1.1",
  "192",
  "452.1.566.2",
  "354.654.789.270",
];
const gatewayArr = [
  {
    gatewaySerial: "52942051685595803191",
    gatewayName: "Yerevan",
    ipv4: "60.159.89.75",
  },
  {
    gatewaySerial: "92617104835333770589",
    gatewayName: "Surat",
    ipv4: "150.186.102.108",
  },
  {
    gatewaySerial: "10397676013408948770",
    gatewayName: "Chuí",
    ipv4: "63.203.106.167",
  },
  {
    gatewaySerial: "78900430088752632778",
    gatewayName: "Busan",
    ipv4: "7.227.150.215",
  },
  {
    gatewaySerial: "01129602378975787793",
    gatewayName: "Los Angeles",
    ipv4: "197.37.62.26",
  },
  {
    gatewaySerial: "69463568918965674651",
    gatewayName: "Tampa",
    ipv4: "95.251.80.207",
  },
  {
    gatewaySerial: "66739206062428258962",
    gatewayName: "Pontianak",
    ipv4: "44.12.72.100",
  },
  {
    gatewaySerial: "64141917314201039067",
    gatewayName: "Asunción",
    ipv4: "134.102.48.29",
  },
  {
    gatewaySerial: "63182867300762367774",
    gatewayName: "Gothenburg",
    ipv4: "2.88.96.194",
  },
  {
    gatewaySerial: "54381086819493926358",
    gatewayName: "Rochester",
    ipv4: "59.8.124.35",
  },
  {
    gatewaySerial: "49157076462481580351",
    gatewayName: "Assis",
    ipv4: "160.10.23.141",
  },
  {
    gatewaySerial: "20978037962305703771",
    gatewayName: "Ponta Delgada",
    ipv4: "119.153.205.179",
  },
];
describe("Unit Test", () => {
  describe("Testing service custom error 'GatewayError'", () => {
    it("A new 'Error' object is not an instance of 'GatewayError'", () => {
      expect(new Error()).not.instanceof(GatewayError);
    });

    it("A new 'GatewayError' object is an instance of 'Error'", () => {
      expect(new GatewayError()).to.instanceof(Error);
    });

    it("A new 'GatewayError' object is an instance of 'GatewayError'", () => {
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

  describe("Testing 'ValidateGateway' function", () => {
    //input object structure:
    //{
    // gatewaySerial: String,
    // gatewayName: String,
    // ipv4: (valid ipv4 address) String
    //}
    describe("ValidateGateway should throw an error if:", () => {
      //ValidateGateway should throw an error if input object has a missing property
      it("Input object have no 'gatewaySerial' property", () => {
        const input = {
          gatewayName: "Control-1",
          ipv4: "192.168.1.1",
        };
        expect(() => {
          ValidateGateway(input);
        }).to.throw("Missing Gateway Data");
      });
      it("Input object have no 'gatewayName' property", () => {
        const input = {
          gatewaySerial: "123",
          ipv4: "192.168.1.1",
        };
        expect(() => {
          ValidateGateway(input);
        }).to.throw("Missing Gateway Data");
      });
      it("Input object have no 'ipv4' property", () => {
        const input = {
          gatewaySerial: "123",
          gatewayName: "Control-1",
        };
        expect(() => {
          ValidateGateway(input);
        }).to.throw("Missing Gateway Data");
      });

      //ValidateGateway should throw an error if input object has an empty value
      it("Input object have empty 'gatewaySerial' value", () => {
        const input = {
          gatewaySerial: "",
          gatewayName: "Control-1",
          ipv4: "192.168.1.1",
        };
        expect(() => {
          ValidateGateway(input);
        }).to.throw("Missing Gateway Data");
      });
      it("Input object have empty 'gatewayName' value", () => {
        const input = {
          gatewaySerial: "123",
          gatewayName: "",
          ipv4: "192.168.1.1",
        };
        expect(() => {
          ValidateGateway(input);
        }).to.throw("Missing Gateway Data");
      });
      it("Input object have empty 'ipv4' value", () => {
        const input = {
          gatewaySerial: "123",
          gatewayName: "Control-1",
          ipv4: "",
        };
        expect(() => {
          ValidateGateway(input);
        }).to.throw("Missing Gateway Data");
      });

      //ValidateGateway should throw an error if input object has an value data type
      it("Input object have wrong 'gatewaySerial' value data type", () => {
        const input = {
          gatewaySerial: 2,
          gatewayName: "Control-1",
          ipv4: "192.168.1.1",
        };
        expect(() => {
          ValidateGateway(input);
        }).to.throw("Missing Gateway Data");
      });
      it("Input object have wrong 'gatewayName' value data type", () => {
        const input = {
          gatewaySerial: "2",
          gatewayName: 1,
          ipv4: "192.168.1.1",
        };
        expect(() => {
          ValidateGateway(input);
        }).to.throw("Missing Gateway Data");
      });
      it("Input object have wrong 'gatewaySerial' value data type", () => {
        const input = {
          gatewaySerial: "2",
          gatewayName: "Control-1",
          ipv4: 19216811,
        };
        expect(() => {
          ValidateGateway(input);
        }).to.throw("Missing Gateway Data");
      });

      //ValidateGateway should throw an error if input object has bad ipv4 address string
      badIpv4Arr.forEach((badIp) => {
        it(`Input object has a bad ipv4 address string: ${badIp}`, () => {
          const input = {
            gatewaySerial: "2",
            gatewayName: "Control-1",
          };
          expect(() => {
            ValidateGateway({ ...input, ipv4: badIp });
          }).to.throw("Bad Gateway IPv4 Address");
        });
      });
    });
    describe("ValidateGateway should not throw an error if:", () => {
      gatewayArr.forEach((gateway) => {
        it(`Input a valid gateway object: ${JSON.stringify(gateway)}`, () => {
          expect(() => {
            ValidateGateway(gateway);
          }).not.throw();
        });
      });
    });
    //ValidateGateway should not throw error if input object is good
  });
});

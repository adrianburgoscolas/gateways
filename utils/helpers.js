//Custom gateway service Error
class GatewayError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

//ValidateGateway validate gateway data sent by an user/app
function ValidateGateway(gateway) {
  if (
    !gateway.gatewaySerial ||
    !gateway.gatewayName ||
    !gateway.ipv4 ||
    typeof gateway.gatewaySerial !== "string" ||
    typeof gateway.gatewayName !== "string" ||
    typeof gateway.ipv4 !== "string"
  ) {
    throw new GatewayError("Missing Gateway Data", 400);
  }
  let ipv4Arr = gateway.ipv4.split(".").filter((str) => parseInt(str));
  if (ipv4Arr.length !== 4) {
    throw new GatewayError("Bad Gateway IPv4 Address", 400);
  }
  ipv4Arr.forEach((num) => {
    if (num < 0 || num > 255) {
      throw new GatewayError("Bad Gateway IPv4 Address", 400);
    }
  });
}

//ValidateDevice validate device data sent by an user/app
function ValidateDevice(device) {
  if (
    !device.uid ||
    !device.vendor ||
    !device.status ||
    typeof device.vendor !== "string" ||
    typeof device.status !== "string" ||
    typeof device.uid !== "number"
  ) {
    throw new GatewayError("Missing Device Data", 400);
  }
  if (!/online|offline/.test(device.status)) {
    throw new GatewayError("Bad Device Status", 400);
  }
}

module.exports.ValidateGateway = ValidateGateway;
module.exports.GatewayError = GatewayError;
module.exports.ValidateDevice = ValidateDevice;

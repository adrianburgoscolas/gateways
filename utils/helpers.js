//Custom gateway service Error
class GatewayError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

function ValidateGateway(gateway) {
  if (!gateway.gatewaySerial || !gateway.gatewayName || !gateway.ipv4) {
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

module.exports.ValidateGateway = ValidateGateway;
module.exports.GatewayError = GatewayError;

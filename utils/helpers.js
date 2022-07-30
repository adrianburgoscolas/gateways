module.exports.ValidateGateway = function ValidateGateway(gateway) {
  if (!gateway.gatewaySerial || !gateway.gatewayName || !gateway.ipv4) {
    throw new Error("Missing Gateway Data");
  }
  let ipv4Arr = gateway.ipv4.split(".").filter((str) => parseInt(str));
  if (ipv4Arr.length !== 4) {
    throw new Error("Bad Gateway IPv4 Address");
  }
  ipv4Arr.forEach((num) => {
    if (num < 0 || num > 255) {
      throw new Error("Bad Gateway IPv4 Address");
    }
  });
};

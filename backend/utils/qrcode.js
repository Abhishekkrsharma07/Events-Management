const QRCode = require("qrcode");

const generateQR = async (data) => {
  try {
    return await QRCode.toDataURL(JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

module.exports = generateQR;